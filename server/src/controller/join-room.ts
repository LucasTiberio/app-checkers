import { Request, Response } from "express";

import { socketServer } from "..";
import CheckersRoom from "../intances/checkers-room";

// Libs
import { getRedisInstance } from "../libs/redis";
import { ApiResponse } from "../types/controller";
import publishRoomUpdatedEvent from "../events/publish/room-updated.pub";

export default async function joinRoomController(req: Request, res: Response) {
    const { name, password, joinerId, playerName } = req.body;

    try {
        if (!name || !joinerId || !playerName) {
            throw "Invalid body"
        }

        const redisInstance = getRedisInstance();

        const checkersRoom = new CheckersRoom(redisInstance, name);
        const joinedRoom = await checkersRoom.join(joinerId, playerName, password)
        publishRoomUpdatedEvent(socketServer, null, joinedRoom.name, joinedRoom)

        res.status(200).send({
            data: {
                room: joinedRoom,
            }
        } as ApiResponse)
    } catch (error: any) {
        res.status(400).send({
            error,
        } as ApiResponse)
    }

}
