import React from "react"
import { StyledRoomListItemGrid } from "./styles";
import { CheckersRoom } from "../../../../hooks/useRooms";

type Props = {
    // children: React.ReactNode;
    room: CheckersRoom
} &  React.ButtonHTMLAttributes<HTMLButtonElement>

export default function RoomListItem(props: Props) {
    const { room, ...restProps } = props;
    return (
        <StyledRoomListItemGrid {...restProps}>
            <span>{room.name}</span>
            <span>{room.player2 ? "2/2" : "1/2"} players</span>
            <span>{room.player1.name}</span>
        </StyledRoomListItemGrid>
    )
}