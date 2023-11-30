import { Request, Response } from "express";

import CheckersRoom from "../intances/checkers-room";

// Libs
import { getRedisInstance } from "../libs/redis";
import { ApiResponse } from "../types/controller";

export default async function getRoomController(req: Request, res: Response) {
    const { name } = req.body;

    try {
        if (!name) {
            throw "Invalid body"
        }

        const redisInstance = getRedisInstance();

        const room = new CheckersRoom(redisInstance, name);
        const dbRoom = await room.get()

        res.status(200).send({
            data: {
                room: dbRoom,
            }
        } as ApiResponse)
    } catch (error: any) {
        res.status(400).send({
            error,
        } as ApiResponse)
    }

}
