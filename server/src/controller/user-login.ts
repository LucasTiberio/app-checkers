import { Request, Response } from "express";

// Libs
import { getRedisInstance } from "../libs/redis";
import { getAllKeysByPattern } from "../utils/redis";

// Types
import { ApiResponse } from "../types/controller";
import { Room } from "../types/checkers-room";

export default async function userLoginController(req: Request, res: Response) {
    const { name } = req.body;

    try {
        if (!name) {
            throw "Invalid body"
        }

        const redisInstance = getRedisInstance();
        const rooms: Room[] = await getAllKeysByPattern(redisInstance, "room-")
        const nonFinishedRooms = rooms.filter(room => room.status !== "FINISHED")

        const isNameUsed = nonFinishedRooms.some(room => room.player1.name === name || room.player2?.name === name);

        if (isNameUsed) {
            throw "This name is being used"
        }

        res.status(200).send({
            data: {
                name,
            }
        } as ApiResponse)
    } catch (error: any) {
        res.status(400).send({
            error,
        } as ApiResponse)
    }
}
