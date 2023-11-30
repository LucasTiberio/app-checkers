export enum BoardPieces {
    P1 = "player1",
    P2 = "player2",
    EMPTY = "empty",
}

export function generateDefaultBoard(xLength: number, yLength: number): BoardPieces[][] {
    const board = [];

    const middleOfBoard = Math.round(xLength / 2);
    const middleOfBoard2 = Math.round(xLength / 2) - 1;

    for (let x = 0; x < xLength; x++) {
        const row = [];

        for (let y = 0; y < yLength; y++) {
            let piece: BoardPieces = BoardPieces.EMPTY;

            // Init checkered board
            if ((x + y) % 2 === 0) {
                piece = BoardPieces.P1
            } else {
                piece = BoardPieces.P2
            }

            // Remove all P2 from LEFT
            if (y < middleOfBoard && piece === BoardPieces.P2) {
                piece = BoardPieces.EMPTY
            }

            if (y > middleOfBoard2) {
                // Remove all P2 from RIGHT
                if (piece === BoardPieces.P2) {
                    piece = BoardPieces.EMPTY
                }
                
                // Replace P1->P2 on RIGHT
                if (piece === BoardPieces.P1) {
                    piece = BoardPieces.P2
                }
            }

            // Middle columns in board
            if (y === middleOfBoard || y === middleOfBoard2) {
                piece = BoardPieces.EMPTY
            }

            row.push(piece)
        }

        board.push(row);
    }

    return board;
}

export function getPiecesQuantityInBoard(board: string[][], piece: string) {
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