import styled from "styled-components";
import CheckersRoomActions from "../../components/CheckersRoomActions";
import BackToHome from "../../components/BackToHome";

export const StyledPageContainer = styled.main`
    position: relative;

    min-height: 100vh;
    width: 100%;
`

export const StyledCheckersRoomActions = styled(CheckersRoomActions)`
    margin: 1rem 0;

    flex: 1;
`

export const StyledBackToHome = styled(BackToHome)`
    position: absolute;
    left: 1rem;
    top: 1rem;
`