import socketIoClient from "../libs/socket-io";

export function handleConnection(socketIo?: typeof socketIoClient) {
    if (socketIo && !socketIo.connected) {
        socketIo.connect()
    }
}