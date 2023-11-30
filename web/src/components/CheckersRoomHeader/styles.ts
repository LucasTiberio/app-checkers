import styled from "styled-components";

export const Container = styled.div`
    position: relative;

`

export const PlayersNameWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    :first-child, :last-child {
        flex: 1;
    }
`

export const RoomStatusWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const NameAndPiecesCount = styled.div`
    display: flex;
    flex-direction: column;

    &:first-of-type {
        align-items: end;
    }
`