import styled from "styled-components";

export const HeroSection = styled.section`
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;
`

export const StyledImage = styled.img`
    width: 100%;
    max-height: 75%;
`

export const ContentWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;

    justify-content: space-evenly;

`

export const PlayTitle = styled.h1`
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 2.5rem;
`

export const PlayWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    span {
        font-weight: 300;
    }
`

export const PlayCta = styled.div`
    display: flex;
    gap: 1rem;
`