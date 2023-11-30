import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

import useActiveWindow from "./useActiveWindow";
import { RoomUpdatedEvent } from "./useCheckersRoom";

import shortPolling from "../utils/polling";
import { API_BASE_URL } from "../utils/constants";

export type CheckersRoom = RoomUpdatedEvent

export default function useRooms() {
    const pollingInterval = useRef<number>()
    const [rooms, setRooms] = useState<CheckersRoom[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    const { isWindowActive } = useActiveWindow();

    const fetchRooms = useCallback(async () => {
        const { data: { data } } = await axios.get(`${API_BASE_URL}/rooms`);
        
        setRooms(data.rooms);
        setLoading(false);
    }, [])

    useEffect(() => {
        if (isWindowActive) {
            setLoading(true)
            pollingInterval.current = shortPolling(3, fetchRooms);
        } else {
            pollingInterval.current = undefined;
        }

        return () => {
            clearTimeout(pollingInterval.current)
        }
    }, [fetchRooms, isWindowActive])

    return {
        rooms,
        setRooms,
        isLoading,
    }
}
