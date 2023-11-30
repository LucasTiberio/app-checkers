import { useState } from "react"
import BoardCell from "./BoardCell"
import { BoardPieces } from "../../utils/board"
import { Row} from "./styles"
import { MovePieceOptions } from "./types"

export type Board = BoardPieces[][]

type Props = {
    board: Board
    disabled?: boolean;
    playerType?: string;
    setBoard: (board: Board) => void
    onMove: (type: BoardPieces, updatedBoard: Board) => Promise<void>;
}

export default function CheckersBoard({ board, playerType, setBoard, onMove, disabled }: Props) {
    const [selectedPiece, setSelectedPiece] = useState<[BoardPieces, number, number] | null>(null);
    const [, selectedPieceX, selectedPieceY] = selectedPiece || [];
    const [queens, setQueens] = useState<[number, number][]>([]);

    const handleSelectPiece = (type: BoardPieces, x: number, y: number) => {
        if (disabled || playerType !== type) {
            return;
        }

        if (playerType !== type) {
            return;
        }

        setSelectedPiece([type, x, y])
    }

    const isQueen = (x?: number, y?: number) => queens.some(([posX, posY]) => posX === x && posY === y)

    const isSelectecPieceQueen = isQueen(selectedPieceX, selectedPieceY);
    
    const handleMovePiece = async (
        options: MovePieceOptions
    ) => {
        if (!selectedPiece || disabled) {
            return;
        }
        const { x, y, killedPiecePosition } = options;
        const [selectedPieceType, selectedPieceX, selectedPieceY] = selectedPiece;

        const newBoard = [...board];

        if (/** has killed some piece */ killedPiecePosition) {
            const [killedPiecePositionX, killedPiecePositionY] = killedPiecePosition
            newBoard[killedPiecePositionY][killedPiecePositionX] = BoardPieces.EMPTY;
        }

        newBoard[y][x] = selectedPieceType;
        newBoard[selectedPieceY][selectedPieceX] = BoardPieces.EMPTY;

        const isMostRightCell = x + 1 === board.length;
        const isMostLeftCell = x === 0;
        if (!isQueen(x, y) && (isMostLeftCell || isMostRightCell)) {
            setQueens(queens => [...queens, [x, y]]);
        }

        await onMove(selectedPieceType, newBoard)

        setBoard(newBoard)
        setSelectedPiece(null);
    }

    return board.map((row, y) => {
        return (
            <Row key={`checkers-board-row-${y}`} columns={board.length}>
                {row.map((cell, x) => {
                    const isCellQueen = isQueen(x, y);

                    return (
                        <BoardCell
                            key={`${x}-${y}`}
                            type={cell}
                            board={board}
                            location={[x, y]}
                            isQueen={isCellQueen}
                            selectedPiece={selectedPiece}
                            onMovePiece={handleMovePiece}
                            onSelectPiece={handleSelectPiece}
                            isSelectecPieceQueen={isSelectecPieceQueen}
                        />
                    )
                })}
            </Row>
        )
    })
}