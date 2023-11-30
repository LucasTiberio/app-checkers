import { Redis } from "ioredis";
import { Player, Room, RoomMetadata, RoomStatus } from "../types/checkers-room";

export default class CheckersRoomDb {
    private redis: Redis;
    roomName: string;
    roomId: string;

    constructor(redis: Redis, roomName: string, roomId: string) {
        this.redis = redis;
        this.roomName = roomName
        this.roomId = roomId
    }

    private async getRoomPassword() {
        const room = await this.redis.get(this.roomId);

        if (room) {
            return JSON.parse(room).password as string;
        }
    
        return null;
    }

    private async updateDbRoom(room: Room) {
        const expiry = 60_000 * 60 * 12; // 12 hours
        await this.redis.set(this.roomId, JSON.stringify(room), "PX", expiry)

        return room;
    }

    private async validateRoomPassword(password: string) {
        const roomPassword = await this.getRoomPassword();
        if (!roomPassword) {
            return false;
        }

        const parsedPassword = atob(roomPassword);

        return password === parsedPassword;
    }

    async getRoom() {
        const room = await this.redis.get(this.roomId);

        if (room) {
            const parsedRoom = JSON.parse(room) as Room;
            if (parsedRoom.password) {
                delete parsedRoom.password
            }

            return parsedRoom;
        }
    
        return null;
    }

    async updateRoomMetadata(metadata: RoomMetadata) {
        try {
            const room = await this.getRoom();

            if (!room) {
                throw "This room does not exists"
            }

            await this.updateDbRoom({ ...room, metadata })

            return room;
        } catch (error) {
            console.error("Error while updating room metadata ", error)
        }
    }

    async updateRoomStatus(status: RoomStatus) {
        try {
            const room = await this.getRoom();

            if (!room) {
                throw "This room does not exists"
            }

            await this.updateDbRoom({ ...room, status })

            return room;
        } catch (error) {
            console.error("Error while updating room status ", error)
        }
    }

    async updateRoomBoard(board: string[][]) {
        try {
            const room = await this.getRoom();

            if (!room) {
                throw "This room does not exists"
            }

            await this.updateDbRoom({ ...room, board })

            return room;
        } catch (error) {
            console.error("Error while updating room game board ", error)
        }
    }

    async createRoom(idPlayer1: string, playerName: string, password?: string): Promise<Room> {
        try {
            const roomExists = !!(await this.getRoom());
            if (roomExists) {
                throw "Duplicated room name"
            }

            const player1: Player = {
                id: idPlayer1,
                name: playerName,
            }

            const room: Room = {
                name: this.roomName,
                status: "WAITING",
                ownerId: player1.id,
                player1,
                metadata: {
                    nextPlayerType: "player1"
                },
            }

            if (password) {
                const parsedPassword = btoa(password)
                room.password = parsedPassword;
            }

            await this.updateDbRoom(room);

            return room;
        } catch (error) {
            console.error("Error while creating a Checkers Room " + this.roomId)
            console.error(error)
            throw error;
        }
    }

    async joinRoom(playerId: string, playerName: string, password?: string): Promise<Room> {
        try {
            const room = await this.getRoom();
            if (!room) {
                throw "Room does not exists"
            }
            
            if (password) {
                const isPasswordValid = await this.validateRoomPassword(password);
                if (!isPasswordValid) {
                    throw "Invalid room password"
                }
            }

            if (room.player1 || room.player2) {
                if (room.player1.id === playerId || room.player2?.id === playerId) {
                    return room; // Rejoin
                }

                if (room.player1 && room.player2) {
                    throw "The room is full."
                }
            }

            if (room.status === "STARTED") {
                throw "This game has already started."
            }

            if (room.status === "FINISHED") {
                // TODO: Excluir sala?
                throw "You cannot join this room."
            }

            const player: Player = {
                id: playerId,
                name: playerName
            }

            const updatedRoom: Room = { 
                ...room,
                player2: player, // ATTENTION
            }

            await this.updateDbRoom(updatedRoom);
            return updatedRoom
        } catch (error) {
            console.error("Error while joining a Checkers Room " + this.roomId)
            console.error(error)
            throw error;
        }
    }

    async getPlayer(playerType: "player1" | "player2") {
        try {
            const room = await this.getRoom();

            if (!room) {
                throw "Room does not exists"
            }

            return room[playerType]
        } catch (error) {
            console.error("Error while joining a Checkers Room " + this.roomId)
            console.error(error)
            throw error;
        }
    }

    async deleteRoom() {
        try {
            const roomExists = !!(await this.getRoom());
            if (roomExists) {
                throw "This room does not exists"
            }

            this.redis.del(this.roomId);
        } catch (error) {
            console.error("Error while deleting a Checkers Room " + this.roomId)
            console.error(error)
            throw error;
        }
    }

    async removePlayer2FromRoom() {
        try {
            const room = await this.getRoom();
            if (!room) {
                throw "This room does not exists"
            }

            if (!room.player2) {
                throw "This room does not have a player2"
            }

            this.updateDbRoom({
                ...room,
                player2: undefined,
            })
        } catch (error) {
            console.error("Error while removing player2 from Checkers Room " + this.roomId)
            console.error(error)
            throw error;
        }
    }
}
