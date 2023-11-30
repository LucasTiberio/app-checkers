import { Board } from "../types/board";
import { Player, Room } from "../types/checkers-room";

export function getPiecesQuantityInBoard(board: Board, piece: string) {
    const piecesQuantity = board?.reduce((qty, current) => {
        current.forEach((pieceType) => {
            if (pieceType === piece) {
                qty++
            }
        })

        return qty
    }, 0);

    return piecesQuantity ?? undefined;
}

export function getRoomWinner(room: Room): Player | undefined {
    if (!room.board) {
        return undefined;
    }

    const qtyPiecesP1 = getPiecesQuantityInBoard(room.board, "player1")
    const qtyPiecesP2 = getPiecesQuantityInBoard(room.board, "player2")
    
    if (qtyPiecesP1 === 0 && qtyPiecesP2 === 0) {
        return undefined;
    }

    let winner: Player | undefined = undefined;

    if (qtyPiecesP1 === 0) {
        winner = room.player2;
    } else if (qtyPiecesP2 === 0) {
        winner = room.player1
    }

    return winner;
}