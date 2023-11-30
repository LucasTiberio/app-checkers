import styled from "styled-components";
import { ButtonVariants, Props as ButtonProps } from "./types";

const BORDER_BY_VARIANT: Record<ButtonVariants, string> = {
    PRIMARY: "#000",
    SECONDARY: "#F5F5F5",
}
const HOVER_BORDER_BY_VARIANT: Record<ButtonVariants, string> = {
    PRIMARY: "#F5F5F5",
    SECONDARY: "#000",
}
const BACKGROUND_BY_VARIANT: Record<ButtonVariants, string> = {
    PRIMARY: "#000",
    SECONDARY: "#F5F5F5",
}
const HOVER_BACKGROUND_BY_VARIANT: Record<ButtonVariants, string> = {
    PRIMARY: "#F5F5F5",
    SECONDARY: "#000",
}
const FONT_COLOR_BY_VARIANT: Record<ButtonVariants, string> = {
    PRIMARY: "#F5F5F5",
    SECONDARY: "#000",
}
const HOVER_FONT_COLOR_BY_VARIANT: Record<ButtonVariants, string> = {
    PRIMARY: "#000",
    SECONDARY: "#F5F5F5",
}

export const StyledButton = styled.button<ButtonProps>`
    outline: none;
    
    padding: 0.6rem 1rem;

    border: 1px solid ${({ variant }) => BORDER_BY_VARIANT[variant]};
    background-color: ${({ variant }) => BACKGROUND_BY_VARIANT[variant]};
    color: ${({ variant }) => FONT_COLOR_BY_VARIANT[variant]};
    
    &:hover {
        border-color: ${({ variant }) => HOVER_BORDER_BY_VARIANT[variant]};
        background-color: ${({ variant }) => HOVER_BACKGROUND_BY_VARIANT[variant]};
        color: ${({ variant }) => HOVER_FONT_COLOR_BY_VARIANT[variant]};
    }

    cursor: pointer;
`