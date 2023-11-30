import { useRef } from "react";
import useClickOutside from "../../../hooks/useClickOutside";
import { FixedContainer } from "./styles";

type Props = {
    opened: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function BottomBar(props: Props) {
    const fixedContainerRef = useRef(null)

    useClickOutside(props.onClose, fixedContainerRef)

    return (
        <FixedContainer opened={props.opened} ref={fixedContainerRef}>
            {props.children}
        </FixedContainer>
    )
}