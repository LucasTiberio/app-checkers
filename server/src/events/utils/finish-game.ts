import { Redis } from "ioredis";
import { getRedisInstance } from "../../libs/redis";
import CheckersRoomDb from "../../repository/checkers-room.db";
import { Room, RoomMetadata } from "../../types/checkers-room";
import { getRoomWinner } from "../../utils/board";

export async function handleFinishGameByBoardPieces(redis: Redis, room: Room) {
    if (!room.board) {
        return;
    }

    const checkersRoomRepository = new CheckersRoomDb(redis, room.name, `room-${room.name}`)
    checkersRoomRepository.updateRoomStatus("FINISHED");
    room.status = "FINISHED"

    const winner = getRoomWinner(room);

    const metadata: RoomMetadata = {
        ...room.metadata,
        ...(winner && { winner }),
    }

    room.metadata = metadata;
    await checkersRoomRepository.updateRoomMetadata(metadata);

    return room
}