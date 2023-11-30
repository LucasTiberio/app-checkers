
import { Request, Response } from "express";

// Libs
import { getRedisInstance } from "../libs/redis";
import { ApiResponse } from "../types/controller";
import { getAllKeysByPattern } from "../utils/redis";

export default async function getAllRoomsController(req: Request, res: Response) {

    try {
        const redisInstance = getRedisInstance();
        const rooms = await getAllKeysByPattern(redisInstance, "room-")

        res.status(200).send({
            data: {
                rooms: rooms,
            }
        } as ApiResponse)
    } catch (error: any) {
        res.status(400).send({
            error,
        } as ApiResponse)
    }

}
