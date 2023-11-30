import { BoardPieces } from "../../utils/board";
import Button from "../ui/Button";
import { ButtonsWrapper } from "./styles";
import { Props } from "./types";

export default function CheckersRoomActions(props: Props) {
    const { playerType, room, onStartGame, onLeaveRoom, ...restProps } = props;

    const isP1 = playerType === BoardPieces.P1;

    return (
        <ButtonsWrapper {...restProps}>
            {room.status === "WAITING" && isP1 && (
                <Button variant="PRIMARY" onClick={onStartGame}>
                    Start game
                </Button>
            )}
            {room.status === "STARTED" && (
                <>
                    <Button variant="PRIMARY" onClick={onLeaveRoom}>
                        Leave game
                    </Button>
                </>
            )}
        </ButtonsWrapper>
    )
}