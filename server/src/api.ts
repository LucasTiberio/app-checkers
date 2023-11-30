import express from "express";
import cors from "cors";

// Controllers
import createRoomController from "./controller/create-room";
import getRoomController from "./controller/get-room";
import joinRoomController from "./controller/join-room";
import getAllRoomsController from "./controller/get-all-rooms";
import userLoginController from "./controller/user-login";
import playerMoveController from "./controller/player-move";
import startGameRoomController from "./controller/start-game-room";
import playerLeaveRoomController from "./controller/player-leave-room";

// Utils
import { ENV_EXPRESS_PORT } from "./utils/constants";

function setupRoutes() {
    const routes = express.Router();
    
    routes.get("/room", getRoomController);
    routes.get("/rooms", getAllRoomsController);
    routes.post("/room/create", createRoomController);
    routes.post("/room/join", joinRoomController);
    routes.post("/room/player-move", playerMoveController);
    routes.post("/room/start-game", startGameRoomController);
    routes.post("/room/player-leave-room", playerLeaveRoomController);

    routes.post("/user/login", userLoginController)

    return routes;
}

export default function createApiServer() {
    const app = express();

    app.use(express.json());
    app.use(cors())

    const routes = setupRoutes();
    app.use("/api", routes)

    app.listen(ENV_EXPRESS_PORT, () => {
        console.log("[Express] Server running on port " + ENV_EXPRESS_PORT)
    })

    return app;
}