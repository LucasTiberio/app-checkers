import styled from "styled-components";
import { Props as DivisorProps } from "./types";

export const StyledDivisor = styled.div<DivisorProps>`
    height: 1px;
    width: 100%;
    margin: ${({ marginY, marginX }) => `${marginY || 0}rem ${marginX || 0}rem`};
    background-color: ${({ color }) => color || "black"};
`