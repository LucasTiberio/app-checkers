import styled from "styled-components";


export const StyledWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 0.3rem;

    width: fit-content;
`

export const Dot = styled.div<{ scored: number }>`
    position: relative;

    width: 1rem;
    height: 1rem;
    
    border-radius: 100%;
    background-color: #000;


    &::before, &::after {
        display: ${({ scored }) => scored ? "block" : "none"};

        content: "";
        position: absolute;
        top: 50%;
        left: 50%;

        height: 100%;
        width: 2px;
        border-radius: 100%;
        background-color: red;
    }

    &::before {
        transform: translate(-50%, -50%) rotate(45deg);
    }

    &::after {
        transform: translate(-50%, -50%) rotate(-45deg);
    }
`