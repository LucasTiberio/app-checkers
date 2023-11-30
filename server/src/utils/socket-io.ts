import { Server as SocketServer, Socket } from "socket.io";
import { PublishEvents } from "../events/types";

export function emitEvent(socket: Socket | SocketServer, event: PublishEvents, data: unknown) {
    socket.emit(event, data);
    return socket;
}

export function emitPrivateEvent(io: SocketServer, socket: Socket | null, room: string, event: PublishEvents, data: unknown, options?: { loopback?: boolean }) {
    io.to(room).emit(event, data);

    if (options?.loopback && socket) {
        emitEvent(socket, event, data) // TRY WITHOUT
    }

    return io;
}