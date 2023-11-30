import { Server as SocketServer, Socket } from "socket.io";

// Event Handlers
import onJoinRoom from "./subscribe/onJoinRoom.sub";

// Types
import { SubscriberEvents } from "./types";

export default function registerSocketEvents(socket: SocketServer, userSocket: Socket) {
    const socketOn = (event: SubscriberEvents, handler: (...args: any) => void) => userSocket.on(event, handler)

    socketOn("JOIN-ROOM", onJoinRoom(socket, userSocket))
}