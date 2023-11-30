import { Request, Response } from "express";

import CheckersRoomDb from "../repository/checkers-room.db";

// Libs
import { socketServer } from "..";
import { getRedisInstance } from "../libs/redis";

// Types
import { ApiResponse } from "../types/controller";

// Utils
import publishRoomUpdatedEvent from "../events/publish/room-updated.pub";

export default async function startGameRoomController(req: Request, res: Response) {
    let { room } = req.body;

    try {
        if (!room) {
            throw "Invalid body"
        }

        if (!room.player1 || !room.player2) {
            throw "There are not enough players to start";
        }

        if (room.status !== "WAITING") {
            throw "The game has already started";
        }

        const redis = getRedisInstance();
        const checkersRoomRepository = new CheckersRoomDb(redis, room.name, `room-${room.name}`)
        checkersRoomRepository.updateRoomStatus("STARTED");
        room.status = "STARTED"

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
