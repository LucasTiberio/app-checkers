import { useEffect, useState } from "react";
import socketIo from "../libs/socket-io";

export default function useSocketIo() {
    const [isConnected, setConnected] = useState(socketIo?.connected);

    useEffect(() => {
        function onConnect() {
            setConnected(true)
        }

        function onDisconect() {
            setConnected(false)
        }

        socketIo?.on("connect", onConnect)
        socketIo?.on("disconnect", onDisconect)

        return () => {
            socketIo?.off("connect", onConnect)
            socketIo?.off("disconnect", onDisconect)
        }
    }, []);

    return {
        isConnected,
        socketIo,
    }
}