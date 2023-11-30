import { useState } from "react";

import HeroHomepage from "../../components/HeroHomepage";
import RoomCreatorForm from "../../components/RoomCreatorForm";
import RoomList from "../../components/RoomList";
import BottomBar from "../../components/ui/BottomBar";
import Button from "../../components/ui/Button";
import Divisor from "../../components/ui/Divisor";

import useCheckersRoom from "../../hooks/useCheckersRoom";
import useUser from "../../hooks/useUser";

import { HeadingButtonsWrapper, RoomListHeading, RoomListWrapper, StyledFAQ, StyledUserAuthenticationForm } from "./styles";

export default function Homepage() {
    const [isCreatingRoom, setCreatingRomm] = useState(false)

    const { createRoom } = useCheckersRoom();
    const { user, logout } = useUser();

    const handleStartCreatingRoom = () => setCreatingRomm(true)
    const handleStopCreatingRoom = () => setCreatingRomm(false)

    const handleCreateRoom = async (values: { roomName: string }) => {
        if (!user) {
            return;
        }

        await createRoom(values.roomName)
    }

    const renderRoomListing = () => (
        <>
            <p>Join an existing room to test your skills against fellow enthusiasts, or take the lead by creating your very own room and inviting friends for a customized gaming experience. </p>
            <RoomListHeading>
                <h2>List of open rooms</h2>

                <HeadingButtonsWrapper>
                    <Button variant="SECONDARY" onClick={logout}>
                        Logout
                    </Button>
                    <Button variant="PRIMARY" onClick={handleStartCreatingRoom}>
                        Create room
                    </Button>
                </HeadingButtonsWrapper>
            </RoomListHeading>
            <RoomList />
        </>
    )

    const renderAuthenticationForm = () => (
        <center>
            <h3>Before start to playing, you have to select your username</h3>
            <StyledUserAuthenticationForm />
        </center>
    )

    return (
        <main>
            <HeroHomepage />
            
            <Divisor />

            <BottomBar onClose={handleStopCreatingRoom} opened={isCreatingRoom}>
                <RoomCreatorForm disabled={!user} onSubmit={handleCreateRoom} />
            </BottomBar>

            <RoomListWrapper id="room-listing">
                {user
                    ? renderRoomListing()
                    : renderAuthenticationForm()
                }
            </RoomListWrapper>
            
            <Divisor marginY={4} />

            <StyledFAQ />
        </main>
    )
}