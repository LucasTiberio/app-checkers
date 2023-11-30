import { Redis } from "ioredis";

import CheckersRoomDb from "../repository/checkers-room.db"
import { Room } from "../types/checkers-room";

export default class CheckersRoom {
    name: string;
    private repository: CheckersRoomDb;
    private roomId: string;

    constructor(redis: Redis, name: string) {
        this.name = name;
        this.roomId = `room-${name}`;
        this.repository = new CheckersRoomDb(redis, name, this.roomId);
    }

    async exists(): Promise<boolean> {
        const room = await this.repository.getRoom();
        return !!room;
    }
    
    async create(idPlayer1: string, playerName: string, password?: string): Promise<Room> {
        try {
            const room = await this.repository.createRoom(idPlayer1, playerName, password)

            return room;
        } catch (error) {
            throw error
        }
    }

    async join(playerId: string, playerName: string, password?: string): Promise<Room> {
        try {
            const dbRoom = await this.repository.joinRoom(playerId, playerName, password)

            return dbRoom;
        } catch (error) {
            throw error
        }
    }

    async get() {
        try {
            const room = await this.repository.getRoom();

            return room;
        } catch (error) {
            throw error
        }
    }
}