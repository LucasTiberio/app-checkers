import BackToTop from "./BackToTop";
import { CopyrightWrapper, FooterGrid, FooterSection, StyledFooter } from "./styles";

export default function Footer() {
    return (
        <StyledFooter>
            <FooterGrid>
                <FooterSection>
                    <h3>The Checkers Club</h3>
                    <a target="_blank" href="https://github.com/LucasTiberio/app-checkers">Check the source code here</a>
                </FooterSection>
                <FooterSection>
                    <h4>Follow LucasTiberio on social</h4>
                    <a target="_blank" href="https://github.com/LucasTiberio">GitHub</a>
                    <a target="_blank" href="https://linkedin.com/in/lucas-tiberio">LinkedIn</a>
                </FooterSection>
            </FooterGrid>

            <CopyrightWrapper>
                Made with ❤️ @ 2023
                <BackToTop />
            </CopyrightWrapper>
        </StyledFooter>
    )
}