import styled from "styled-components";

export const StyledRoomListItemGrid = styled.button`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    padding: 0.7rem;

    outline: none;
    border: none;
    background: none;

    cursor: ${({ onClick }) => onClick ? "pointer" : "auto"};

    &:hover {
        background-color: rgba(0,0,0,0.07);
    }
`