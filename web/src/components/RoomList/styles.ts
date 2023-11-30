import styled from "styled-components";
import { StyledRoomListItemGrid } from "./components/RoomListItem/styles";

export const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 100%;
`

export const StyledRoomListFirstItem = styled(StyledRoomListItemGrid)`
    padding-bottom: 1rem;
    border-bottom: 1px solid black;

    &:hover {
        background: none;
    }
`