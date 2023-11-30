import Button from "../../ui/Button";

export default function BackToTop() {
    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }
    return <Button variant="PRIMARY" onClick={handleBackToTop}>Back to Top ⬆</Button>
}