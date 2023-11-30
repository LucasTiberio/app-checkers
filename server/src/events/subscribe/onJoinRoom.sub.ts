import { Server, Socket } from "socket.io";
import { Room } from "../../types/checkers-room";

export default function onJoinRoom(io: Server, userSocket: Socket) {
    return (room: Room | undefined) => {
        if (!room) {
            return;
        }
    
        userSocket.join(room.name)
    }
}