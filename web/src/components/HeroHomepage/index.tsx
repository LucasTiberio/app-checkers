import Button from "../ui/Button";
import { ContentWrapper, HeroSection, PlayCta, PlayTitle, PlayWrapper, StyledImage } from "./styles";

export default function HeroHomepage() {

    const handleGoToRooms = () => {
        document.getElementById("room-listing")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        })

    }
    const handleGoToFAQ = () => {
        document.getElementById("checkers-faq")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        })
    }

    return (
        <HeroSection>
            <StyledImage src="/friends-playing.jpg" loading="lazy" />

            <ContentWrapper>
                <PlayTitle>
                    Welcome to <br /> The Checkers Club
                </PlayTitle>

                <PlayWrapper>
                    <span>Experience the classic game of strategy and skill.</span>
                    <PlayCta>
                        <Button variant="PRIMARY" onClick={handleGoToRooms}>
                            Play
                        </Button>
                        <Button variant="SECONDARY" onClick={handleGoToFAQ}>
                            Learn More
                        </Button>
                    </PlayCta>
                </PlayWrapper>
            </ContentWrapper>
        </HeroSection>
    )
}