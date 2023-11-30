import { useState } from "react";
import { CollapseContent, CollapseTitle, StyledCollapseWrapper } from "./styles";

type Props = {
    title: string;
    renderContent: () => React.ReactNode;
}

export default function Collapse(props: Props) {
    const [isOpened, setOpened] = useState(false);

    const handleToggleCollapse = () => setOpened(prev => !prev)

    return (
        <StyledCollapseWrapper>
            <CollapseTitle onClick={handleToggleCollapse}>
                {props.title} {isOpened ? "↑" : "↓"}
            </CollapseTitle>

            <CollapseContent opened={isOpened}>
                {props.renderContent()}
            </CollapseContent>
        </StyledCollapseWrapper>
    )
}