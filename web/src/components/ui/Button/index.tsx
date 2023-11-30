import { StyledButton } from "./styles";
import { Props } from "./types";

export default function Button(props: Props) {
    return (
        <StyledButton {...props} />
    )
}