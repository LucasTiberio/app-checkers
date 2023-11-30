import { CheckersRoom } from "../../hooks/useRooms";

export type Props = {
    playerType: string;
    room: CheckersRoom;
    onStartGame: () => void;
    onLeaveRoom: () => void;
}