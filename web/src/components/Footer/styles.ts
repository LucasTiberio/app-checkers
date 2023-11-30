import styled from "styled-components";

export const StyledFooter = styled.footer`
    background-color: black;
    margin-top: 4rem;
    width: 100%;
`

export const FooterGrid = styled.div`
    display: flex;
    justify-content: space-around;

    padding: 3rem 1rem;

    color: white;
`

export const FooterSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    span, a {
        color: white;
        font-size: 0.9rem;
    }
`

export const CopyrightWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: white;

    padding: 2rem 1rem 1rem;
`