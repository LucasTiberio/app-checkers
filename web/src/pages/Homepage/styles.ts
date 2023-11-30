import styled from "styled-components";
import UserAuthenticationForm from "../../components/UserAuthenticationForm";
import FAQ from "../../components/FAQ";

export const RoomListWrapper = styled.section`
    width: 75%;
    padding: 1rem;
    margin: auto;
    margin-top: 2rem;
`

export const StyledFAQ = styled(FAQ)`
    width: 75%;
    padding: 1rem;
    margin: auto;
`

export const RoomListHeading = styled.div`
    margin-top: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const StyledUserAuthenticationForm = styled(UserAuthenticationForm)`
    margin-top: 1rem;
`

export const HeadingButtonsWrapper = styled.div`
    display: flex;
    gap: 0.4rem;
`