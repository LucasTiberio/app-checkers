import { Request, Response } from "express";

import CheckersRoom from "../intances/checkers-room";

// Libs
import { getRedisInstance } from "../libs/redis";
import { ApiResponse } from "../types/controller";

export default async function createRoomController(req: Request, res: Response) {
    const { name, password, creatorId, playerName } = req.body;

    try {
        if (!name || !creatorId || !playerName) {
            throw "Invalid body"
        }

        const redisInstance = getRedisInstance();

        const room = new CheckersRoom(redisInstance, name);
        const created = await room.create(creatorId, playerName, password)

        res.status(200).send({
            data: {
                room: created,
            }
        } as ApiResponse)
    } catch (error: any) {
        res.status(400).send({
            error,
        } as ApiResponse)
    }

}
