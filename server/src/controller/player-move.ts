import { Request, Response } from "express";

import { handleFinishGameByBoardPieces } from "../events/utils/finish-game";
import CheckersRoomDb from "../repository/checkers-room.db";

// Libs
import { socketServer } from "..";
import { getRedisInstance } from "../libs/redis";

// Types
import { ApiResponse } from "../types/controller";
import { RoomMetadata } from "../types/checkers-room";

// Utils
import publishRoomUpdatedEvent from "../events/publish/room-updated.pub";
import { getPiecesQuantityInBoard } from "../utils/board";

export default async function playerMoveController(req: Request, res: Response) {
    const { movedPieceType } = req.body;
    let { room } = req.body;

    try {
        if (!room || !movedPieceType) {
            throw "Invalid body"
        }

        const redis = getRedisInstance();
        const checkersRoomRepository = new CheckersRoomDb(redis, room.name, `room-${room.name}`)

        let nextPlayerType;
        if (movedPieceType === "player1") {
            nextPlayerType = "player2"
        } else if (movedPieceType === "player2") {
            nextPlayerType = "player1"
        }

        const metadata: RoomMetadata = {
            ...room.metadata,
            ...(nextPlayerType && { nextPlayerType }),
        }

        room.metadata = metadata;

        await checkersRoomRepository.updateRoomMetadata(metadata);
        await checkersRoomRepository.updateRoomBoard(room.board)

        const qtyPiecesP1 = getPiecesQuantityInBoard(room.board, "player1")
        const qtyPiecesP2 = getPiecesQuantityInBoard(room.board, "player2")
        if (qtyPiecesP1 === 0 || qtyPiecesP2 === 0) {
            room = await handleFinishGameByBoardPieces(redis, room);
        }

        publishRoomUpdatedEvent(socketServer, null, room.name, room)

        res.status(200).send({
            data: {
                room,
            }
        } as ApiResponse)
    } catch (error: any) {
        res.status(400).send({
            error,
        } as ApiResponse)
    }

}
