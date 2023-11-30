import { useMemo } from "react"
import { Piece, CrownImage } from "./styles"

type Props = {
    variant: "blue" | "green"
    isQueen: boolean;
    onClick: () => void;
}

export default function CheckersPiece({ onClick, variant, isQueen }: Props) {

    const background = useMemo(() => {
        switch(variant) {
            case "blue":
                return "#13005A";
            case "green":
                return "#03C988";
        }
    }, [variant])

    return (
        <Piece background={background} onClick={onClick}>
            {isQueen && <CrownImage src="/crown.png" />}
        </Piece>
    )
}