import styled from "styled-components";

export const Row = styled.div<{ columns: number }>`
    display: grid;
    grid-template-columns: ${({ columns }) => `repeat(${columns}, 1fr)`};
`
