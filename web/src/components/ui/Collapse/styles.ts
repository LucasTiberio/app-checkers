import styled from "styled-components";

export const StyledCollapseWrapper = styled.div``

export const CollapseTitle = styled.div`
    font-size: 1rem;
    padding: 1rem;

    border-bottom: 1px solid black;
    
    user-select: none;
    cursor: pointer;
`

export const CollapseContent = styled.div<{opened: boolean}>`
    height: 100%;
    max-height: ${({ opened }) => opened ? "15rem" : "0px"};
    overflow: ${({ opened }) => opened ? "auto" : "hidden"};

    transition: max-height 0.2s ease-in-out;

    margin: 1rem;
`