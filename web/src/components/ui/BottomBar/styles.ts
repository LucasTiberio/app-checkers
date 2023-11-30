import styled from "styled-components";

export const FixedContainer = styled.div<{ opened: boolean }>`
    position: fixed;
    bottom: ${({ opened }) => opened ? "0" : "-30"}px;
    left: 0;

    width: 100%;
    max-height: 60%;
    min-height: 20%;

    padding: 2rem;
    
    border-top-right-radius: 32px;
    border-top-left-radius: 32px;
    box-shadow: 0px 1px 7px rgba(0,0,0,0.88);
    
    background-color: #fff;
    overflow: auto;
    opacity: ${({ opened }) => opened ? "1" : "0"};
    pointer-events: ${({ opened }) => opened ? "all" : "none"};

    transition: all 0.2s linear;
`