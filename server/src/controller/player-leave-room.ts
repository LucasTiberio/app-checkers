import { Request, Response } from "express";

import CheckersRoomDb from "../repository/checkers-room.db";

// Libs
import { socketServer } from "..";
import { getRedisInstance } from "../libs/redis";

// Types
import { ApiResponse } from "../types/controller";

// Utils
import publishRoomUpdatedEvent from "../events/publish/room-updated.pub";

export default async function playerLeaveRoomController(req: Request, res: Response) {
    const { playerType } = req.body;
    let { room } = req.body;

    try {
        if (!room || !playerType) {
            throw "Invalid body"
        }

        if (room.status === "FINISHED") {
            throw "The game is finished";
        }

        const redis = getRedisInstance();
        const checkersRoomRepository = new CheckersRoomDb(redis, room.name, `room-${room.name}`)

        if (room.status === "STARTED") {
            // Set winner
            const winner = playerType === "player1" && room.player2
                ? room.player2
                : playerType === "player2"
                    ? room.player1
                    : null;

            if (!winner) {
                return;
            }

            const metadata = {
                winner,
                nextPlayerType: undefined,
            }

            await checkersRoomRepository.updateRoomMetadata(metadata)
            checkersRoomRepository.updateRoomStatus("FINISHED");

            room.metadata = metadata;
            room.status = "FINISHED"

        } else if (room.status === "WAITING") {
            // Delete room if is a p1 action
            if (playerType === "player1") {
                await checkersRoomRepository.deleteRoom();
                
            // Disconnect p2
            } else if (playerType === "player2") {
                await checkersRoomRepository.removePlayer2FromRoom();
                room.player2 = undefined;
            }
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
