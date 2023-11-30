import { useMemo } from "react";
import { Dot, StyledWrapper } from "./styles";

type Props = {
    count: number;
    maxCount: number;
}

export default function PiecesCounter(props: Props) {
    const { count, maxCount } = props

    const maxCountArray = useMemo(() => new Array(maxCount).fill(""), [maxCount])

    return (
        <StyledWrapper>
            {maxCountArray.map((_, i) => {
                const isPieceScored = (i + 1) > count;

                return (
                    <Dot
                        key={`piece-count-${i}`}
                        scored={isPieceScored ? 0 : 1 /** bypass styled-components console error */}
                    />
                )
            })}
        </StyledWrapper>
    )
}