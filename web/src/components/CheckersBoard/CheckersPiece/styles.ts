import styled from "styled-components";

export const Piece = styled.div<{ background: string }>`
    position: relative;

    width: 4.5rem;
    height: 4.5rem;

    margin: 0.2rem;

    &::after {
        content: "";

        position: absolute;
        left: 50%;
        top: 50%;
        width: 3rem;
        height: 3rem;

        transform: translate(-50%, -50%);
        background-color: ${(({ background }) => background)};
        border-radius: 100%;

        box-shadow: 0px 1px 7px rgba(0,0,0,0.88);

        cursor: pointer;
    }

        border-radius: 100%;
    &:hover {
        background-color: rgba(0,0,0,0.6);
    }
`

export const CrownImage = styled.img`
    position: absolute;
    left: 50%;
    top: 50%;

    transform: translate(-50%, -50%);

    width: 70%;
`