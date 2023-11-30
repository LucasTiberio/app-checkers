import styled from "styled-components";
import { getCellBackgroundByVariant } from "./utils";

export const ColumnCell = styled.div<{ variant: "dark" | "light" }>`
    position: relative;

    border: 1px solid black;
    width: 100%;
    height: 100%;

    background-color: ${(({ variant }) => getCellBackgroundByVariant(variant))};

    display: flex;
    justify-content: center;
    align-items: center;
`

export const NextMoveOption = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.4);
    
    cursor: pointer;
    transition: background-color 0.2s linear;

    &:hover {
        background-color: rgba(0,0,0,0.6);
    }
`