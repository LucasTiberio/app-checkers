import { useNavigate } from "react-router-dom"
import Button from "../ui/Button"

export default function BackToHome(props: Record<string, string>) {
    const navigate = useNavigate()
    
    const handleGoToHome = () => {
        navigate("/")
    }

    return (
        <Button variant="PRIMARY" onClick={handleGoToHome} {...props}>
            Back to Home
        </Button>
    )
}