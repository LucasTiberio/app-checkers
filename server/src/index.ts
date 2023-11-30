import createWebSocketServer from "./websocket";
import createApiServer from "./api";

export const socketServer = createWebSocketServer()
createApiServer();