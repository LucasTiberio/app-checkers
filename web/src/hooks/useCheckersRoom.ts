import { useEffect, useMemo, useState } from "react"
import useSocketIo from "./useSocketIo"
import { BoardPieces } from "../utils/board";
import useUser from "./useUser";
import { createRoomRequest, playerJoinRoomRequest, playerLeaveRoomRequest, playerMoveRequest, startGameRequest } from "../services/room.services";

type Player = {
    id: string;
    name: string;
}

export type RoomUpdatedEvent = {
    name: string
    status: string
    ownerId: string;
    player1: Player
    player2?: Player
    password?: string
    board?: BoardPieces[][]
    metadata?: {
        winner?: Player;
        nextPlayerType?: string;
    }
}

export default function useCheckersRoom() {
    const [room, setRoom] = useState<RoomUpdatedEvent | null>(null);

    const { user } = useUser();
    const { isConnected, socketIo } = useSocketIo()

    useEffect(() => {
        function onRoomUpdate(data: RoomUpdatedEvent) {
            // console.log("room updated", data) // Check re-renders
            setRoom(data);
        }

        socketIo?.on("ROOM-UPDATED", onRoomUpdate)

        return () => {
            socketIo?.off("ROOM-UPDATED", onRoomUpdate)
        }
    }, [socketIo])

    const playerType: "player1" | "player2" | undefined = useMemo(() => {
        if (user?.name === room?.player1.name) {
            return "player1"
        }

        if (user?.name === room?.player2?.name) {
            return "player2"
        }

        return undefined;
    }, [user?.name, room])

    const joinRoom = async (roomName: string) => {
        if (!user) {
            return;
        }
        
        try {
            const data = await playerJoinRoomRequest(roomName, user.name, user.id);

            socketIo?.emit("JOIN-ROOM", data.room)
            setRoom(data.room);
        } catch (error) {
            alert("Erro ao entrar na sala")
        }
    }

    const createRoom = async (roomName: string) => {
        if (!user) {
            return;
        }

        try {
            await createRoomRequest(roomName, user.name, user.id);
        } catch (error) {
            alert("Erro ao criar uma sala")
        }
    }

    const leaveCheckersRoom = async () => {
        if (!playerType || !room) {
            return;
        }

        await playerLeaveRoomRequest(room, playerType)
    }

    const startCheckersGame = async () => {
        if (!room) {
            return;
        }

        await startGameRequest(room)
    }

    const makeMove = async (movedPieceType: BoardPieces, room: RoomUpdatedEvent) => {
        if (!room) {
            return;
        }

        const nextPlayerType = movedPieceType === BoardPieces.P1 
            ? BoardPieces.P2
            : movedPieceType === BoardPieces.P2
                ? BoardPieces.P1
                : undefined;

        console.log({ room })
        await playerMoveRequest(room, movedPieceType);

        setRoom({
            ...room,
            metadata: {
                ...room.metadata,
                nextPlayerType,
            }
        });
    }

    return {
        makeMove,
        joinRoom,
        createRoom,
        playerType,
        isConnected,
        joinedRoom: room,
        leaveCheckersRoom,
        startCheckersGame,
    }
}