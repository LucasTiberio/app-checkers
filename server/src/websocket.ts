import { Server as SocketServer} from "socket.io"

import { ENV_HTTP_PORT } from "./utils/constants";
import registerSocketEvents from "./events/registerSocketEvents";

export default function createWebSocketServer() {
    try {
        const io = new SocketServer(ENV_HTTP_PORT, {
            cors: {
                origin: "*"
            }
        });

        io.on("connection", (socket) => {
            console.log("User connected to socket")
            
            registerSocketEvents(io, socket)
        })

        console.log("[SocketIo] WebSocket server running on port " + ENV_HTTP_PORT)
        return io
    } catch (error) {
        console.log("[SocketIo] Error while creating websocket server")
        throw error
    }
}
