import { io } from "socket.io-client";
import { WS_BASE_URL } from "../utils/constants";
import { Socket } from "socket.io-client";

let socketIo: Socket | null = null;

if (!socketIo) {
    socketIo = io(WS_BASE_URL, {
        autoConnect: true,
    });
}

export default socketIo