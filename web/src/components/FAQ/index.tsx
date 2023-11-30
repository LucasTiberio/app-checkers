import Collapse from "../ui/Collapse"
import { StyledFAQGrid } from "./styles"

const faqList = [
    {
        title: "1. How do I play checkers online on the website?",
        texts: ["To play checkers on our website, simply login with a nickname, and access the multiplayer games section. Create a room or join an existing match."]
    },
    {
        title: "2. What are the rules of checkers?",
        texts: ["The rules follow the international standard for checkers. Each player moves their pieces diagonally forward, aiming to capture the opponent's pieces.", "The goal is to achieve piece promotion (turning them into kings) and capturing the opponent's pieces."]
    },
    {
        title: "3. Can I change my username?",
        texts: ["Yes, you can customize your username whenever your want. You just have to logout and select other username 🤓."]
    },
    {
        title: "4. Can I invite friends to play against me?",
        texts: ["Yes, you can invite friends to join the platform.", "Create your room and share the URL (and the password if necessary) with your friend."]
    },
    {
        title: "5. What happens if my internet connection is lost during a game?",
        texts: ["If your internet connection is lost during a game, the system will attempt to reconnect you.", "The game won't end until you come back."]
    },
]

export default function FAQ(props: Record<string, string>) {

    return (
        <div {...props} id="checkers-faq">
            <h2>Frequently asked questions</h2>

            <StyledFAQGrid>
                {faqList.map(faq => <Collapse
                        title={faq.title}
                        renderContent={() => faq.texts.map(text => <p>{text}</p>)}
                    />
                )}
            </StyledFAQGrid>
        </div>
    )
}
