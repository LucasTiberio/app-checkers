import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom"

import CheckersBoard, { Board } from "../../components/CheckersBoard";
import CheckersRoomHeader from "../../components/CheckersRoomHeader";
import useCheckersRoom, { RoomUpdatedEvent } from "../../hooks/useCheckersRoom";
import useUser from "../../hooks/useUser";

import { BoardPieces, generateDefaultBoard } from "../../utils/board";

import { StyledBackToHome, StyledCheckersRoomActions, StyledPageContainer } from "./styles";

export default function CheckersRoom() {
    const [joined, setJoined] = useState(false)
    
    const {
        joinRoom,
        joinedRoom,
        isConnected,
        startCheckersGame,
        leaveCheckersRoom,
        makeMove,
        playerType
    } = useCheckersRoom();
    const { user } = useUser();
    const { roomId } = useParams();

    const [board, setBoard] = useState<Board>(joinedRoom?.board || generateDefaultBoard(8, 8))

    useEffect(() => {
        if (joinedRoom?.board) {
            setBoard(joinedRoom?.board)
        }
    }, [joinedRoom?.board])

    const decodedRoomName = roomId ? decodeURI(roomId) : null;

    useEffect(() => {
        if (!decodedRoomName || joined || !isConnected) {
            return;
        }

        joinRoom(decodedRoomName)
        setJoined(true)
    }, [decodedRoomName, joinRoom, joined, isConnected])

    if (!joined && !joinedRoom) {
        return <h1>Não foi possivel entrar nesta sala</h1>;
    }

    const handleLeaveRoom = () => {
        if (!joinedRoom) {
            return;
        }

        leaveCheckersRoom()
    }

    const handleStartGame = () => {
        if (!joinedRoom) {
            return;
        }

        startCheckersGame()
    }

    const handleMovePiece = async (type: BoardPieces, board: Board) => {
        if (!joinedRoom) {
            return;
        }

        const updatedRoom: RoomUpdatedEvent = {
            ...joinedRoom,
            board,
        }

        makeMove(type, updatedRoom)
    }

    if (!user) {
        return <Navigate to="/" />
    }
    
    return (
        <StyledPageContainer>
            {playerType && joinedRoom && (
                <>
                    <CheckersRoomHeader room={joinedRoom} playerType={playerType} />
                    <StyledCheckersRoomActions
                        room={joinedRoom}
                        playerType={playerType}
                        onLeaveRoom={handleLeaveRoom}
                        onStartGame={handleStartGame}
                    />
                </>
            )}

            <div>
                <CheckersBoard
                    board={board}
                    onMove={handleMovePiece}
                    setBoard={setBoard}
                    playerType={playerType}
                    disabled={
                        joinedRoom?.status !== "STARTED" ||
                        !!joinedRoom.metadata?.winner ||
                        joinedRoom.metadata?.nextPlayerType !== playerType
                }
                />
            </div>

            <StyledBackToHome />
        </StyledPageContainer>
    )
}