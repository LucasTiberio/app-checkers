import { useMemo } from "react";

// Components
import CheckersPiece from "../CheckersPiece";

// Utils
import { BoardPieces } from "../../../utils/board";
import { getDiagonalPossibleMoves, getPossibleMoves } from "./utils";

// Types
import { MovePieceOptions } from "../types";

// Styles
import { NextMoveOption, ColumnCell } from "./styles";
import { Board } from "..";

type Props = {
    board: Board;
    type: BoardPieces
    isQueen: boolean;
    location: [number, number]
    selectedPiece: [BoardPieces, number, number] | null
    isSelectecPieceQueen: boolean;
    onSelectPiece: (type: BoardPieces, x: number, y: number) => void;
    onMovePiece: (options: MovePieceOptions) => void;
}

export default function BoardCell({ board, isQueen, isSelectecPieceQueen, type, selectedPiece, onSelectPiece, location, onMovePiece }: Props) {
    const isEmpty = type === BoardPieces.EMPTY;
    const isP1 = type === BoardPieces.P1;
    // const isP2 = type === BoardPieces.P2;

    const [x, y] = location;

    const isEnemy = useMemo(() => {
        if (!selectedPiece) {
            return null
        }

        const [selectedPieceType] = selectedPiece

        const enemyBasedOnSelectedPiece = selectedPieceType === BoardPieces.P1
            ? BoardPieces.P2
            : BoardPieces.P2
                ? BoardPieces.P1
                : undefined;

        return type === enemyBasedOnSelectedPiece;
    }, [selectedPiece, type])

    const canBeNextMove = useMemo(() => {
        if (!selectedPiece) {
            return false;
        }

        const [selectedPieceType, selectedPieceX, selectedPieceY] = selectedPiece

        const possibleMoves = getPossibleMoves(null, [selectedPieceX, selectedPieceY]);

        const isPossibleMove = possibleMoves.some(([moveX, moveY]) => {
            if (!isSelectecPieceQueen && selectedPieceType === BoardPieces.P1 && selectedPieceX > x) {
                return false;
            }

            if (!isSelectecPieceQueen && selectedPieceType === BoardPieces.P2 && selectedPieceX < x) {
                return false;
            }

            const isPossibleMove = x === moveX && y === moveY

            return isPossibleMove;
        })

        if (isPossibleMove && isEnemy) {
            const vertical = selectedPieceY > y ? "top" : "bottom"
            const horizontal = selectedPieceX < x ? "right" : "left"

            const [enemyDiagonalVectorX, enemyDiagonalVectorY] = getDiagonalPossibleMoves(vertical, horizontal, 2, selectedPieceX, selectedPieceY);
            
            if (enemyDiagonalVectorX > (board[0].length - 1) || enemyDiagonalVectorX < 0 || enemyDiagonalVectorY > (board.length - 1) || enemyDiagonalVectorY < 0) {
                return false;
            }

            const enemyDiagonalVectorType = board[enemyDiagonalVectorY][enemyDiagonalVectorX]

            if (enemyDiagonalVectorType !== BoardPieces.EMPTY) {
                return false;
            }

            return true;
        }

        return isPossibleMove && (isEmpty || isEnemy);

    }, [isEmpty, selectedPiece, x, y, isSelectecPieceQueen, isEnemy, board]);

    const handleMovePiece = () => {
        if (!selectedPiece) {
            return;
        }

        let killedPiecePosition: [number, number] | undefined = undefined; // TODO: ENviar valores CORRETOS
        let assumedX = x
        let assumedY = y

        if (isEnemy) {
            const [selectedPieceType, selectedPieceX, selectedPieceY] = selectedPiece
            const vertical = selectedPieceY > y ? "top" : "bottom"
            const horizontal = selectedPieceType === BoardPieces.P1 ? "right" : "left"
            const [enemyDiagonalVectorX, enemyDiagonalVectorY] = getDiagonalPossibleMoves(vertical, horizontal, 2, selectedPieceX, selectedPieceY);
            
            assumedX = enemyDiagonalVectorX
            assumedY = enemyDiagonalVectorY
            killedPiecePosition = [x, y]
        }

        onMovePiece({
            x: assumedX,
            y: assumedY,
            killedPiecePosition
        })
    }

    const handleSeeAvailableMoves = () => {
        onSelectPiece(type, x, y)
    }

    const boardVariant = y % 2 === 0 
            ? "dark" 
            : "light"

    return (
        <ColumnCell key={`checkers-board-column-cell-${x}-${y}`} variant={boardVariant} className={`${x}-${y}`}>
            {!isEmpty && (
                <CheckersPiece
                    onClick={handleSeeAvailableMoves}
                    variant={isP1 ? "blue" : "green"}
                    isQueen={isQueen}
                />
            )}
            {selectedPiece && canBeNextMove && <NextMoveOption onClick={handleMovePiece} />}
        </ColumnCell>
    )
}