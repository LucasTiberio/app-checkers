import { BoardPieces } from "../../../utils/board";

export function getCellBackgroundByVariant(variant: "dark" | "light") {
    switch(variant) {
        case "dark":
            return "#583101";
        case "light":
            return "#8b5e34";
        default:
            return "white";
    }
}

export function getDiagonalPossibleMoves(
    vertical: "top" | "bottom",
    horizontal: "left" | "right",
    positions: number,
    x: number,
    y: number
) {
    if (vertical === "top") {
        y -= positions
    } else {
        y += positions
    }

    if (horizontal === "left") {
        x -= positions
    } else {
        x += positions
    }

    return [x, y];
}

export function getPossibleMoves(playerType: BoardPieces | null, selectedPiece: [number, number]) {
    const [x, y] = selectedPiece;

    const rightTop = [x+1, y+1]
    const rightBottom = [x+1, y-1]

    const leftTop = [x-1, y+1]
    const leftBottom = [x-1, y-1]

    switch(playerType) {
        case BoardPieces.P1:
            return [rightTop, rightBottom]
        case BoardPieces.P2:
            return [leftTop, leftBottom]
        default:
            return [rightTop, leftTop, leftBottom, rightBottom]
    }
}