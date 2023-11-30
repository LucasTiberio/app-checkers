import { Server, Socket } from "socket.io";

import { emitPrivateEvent } from "../../utils/socket-io";

export default function publishRoomUpdatedEvent(io: Server, socket: Socket | null, room: string, data: unknown) {
    return emitPrivateEvent(
        io,
        socket,
        room,
        "ROOM-UPDATED",
        data
    )
}