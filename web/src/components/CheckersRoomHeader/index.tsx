import { useMemo } from "react";

import PiecesCounter from "./PiecesCounter";

import { Container, NameAndPiecesCount, PlayersNameWrapper, RoomStatusWrapper } from "./styles";
import { getPiecesQuantityInBoard } from "../../utils/board";
import { Props } from "./types";

export default function CheckersRoomHeader(props: Props) {
    const { room, playerType } = props

    const piecesCount = useMemo(() => {
        if (!room.board) {
            return null;
        }

        return {
            player1: getPiecesQuantityInBoard(room.board || [], "player1"),
            player2: getPiecesQuantityInBoard(room.board || [], "player2")
        }
    }, [room.board])

    if (!room) {
        return null;
    }

    const renderRoomStatus = () => {
        switch(room.status) {
            case "WAITING":
                return (
                    <>
                        <span>Waiting for {room.player2 ? "Start" : "Opponent"}</span>
                    </>
                )

            case "STARTED":
                return (
                    <>
                        {room.metadata?.nextPlayerType && (
                            <span>
                                {room.metadata.nextPlayerType === playerType
                                    ? "It's your turn 🤓"
                                    : "Wait for your turn 👀"
                                }
                            </span>
                        )}
                    </>
                )
        
            case "FINISHED":
                return (
                    <>
                        {room?.metadata?.winner && (
                            <>
                                <span>This game has already finished...</span>
                                <b>Winner: {room.metadata.winner.name}</b>
                            </>
                        )}
                    </>
                )
        }
    }

    return (
        <Container>
            <center>
                <h2>{room.name}</h2>
            </center>
            
            <PlayersNameWrapper>
                <NameAndPiecesCount>
                    <span>{room.player1.name || ""}</span>
                    {piecesCount && <PiecesCounter maxCount={12} count={piecesCount.player1} />}
                </NameAndPiecesCount>
                <b> X </b>
                <NameAndPiecesCount>
                    <span>{room.player2?.name || "Waiting players..."}</span>
                    {piecesCount && <PiecesCounter maxCount={12} count={piecesCount.player2} />}
                </NameAndPiecesCount>
            </PlayersNameWrapper>

            <RoomStatusWrapper>
                {renderRoomStatus()}
            </RoomStatusWrapper>
        </Container>
    )
}