import { ButtonHTMLAttributes } from "react"

export type ButtonVariants = "PRIMARY" | "SECONDARY"

export type Props = {
    variant: ButtonVariants
} & ButtonHTMLAttributes<HTMLButtonElement>