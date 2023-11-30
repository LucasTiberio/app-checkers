import axios from "axios";

import { API_BASE_URL } from "../utils/constants";
import { CheckersRoom } from "../hooks/useRooms";

export async function playerJoinRoomRequest(roomName: string, userName: string, userId: string) {
    const { data: { data }} = await axios.post(`${API_BASE_URL}/room/join`, {
        name: roomName,
        playerName: userName,
        joinerId: userId,
    })

    return data;
}

export async function createRoomRequest(roomName: string, userName: string, userId: string) {
    const { data: { data }} = await axios.post(`${API_BASE_URL}/room/create`, {
        name: roomName,
        playerName: userName,
        creatorId: userId,
    })

    return data;
}

export async function playerLeaveRoomRequest(room: CheckersRoom, playerType: string) {
    const { data: { data }} = await axios.post(`${API_BASE_URL}/room/create`, {
        room,
        playerType
    })

    return data;
}

export async function playerMoveRequest(room: CheckersRoom, movedPieceType: string) {
    const { data } = await axios.post(`${API_BASE_URL}/room/player-move`, {
        room,
        movedPieceType
    });

    return data;
}

export async function startGameRequest(room: CheckersRoom) {
    const { data } = await axios.post(`${API_BASE_URL}/room/start-game`, {
        room,
    });

    return data;
}