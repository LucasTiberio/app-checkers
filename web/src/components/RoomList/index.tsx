import { useNavigate } from "react-router-dom"

// Components
import RoomListItem from "./components/RoomListItem"
import useRooms from "../../hooks/useRooms"

// Styles
import { ListWrapper, StyledRoomListFirstItem } from "./styles"
import { StyledRoomListItemGrid } from "./components/RoomListItem/styles"

export default function RoomList() {
    const { rooms, isLoading: isRoomsLoading } = useRooms()
    const navigate = useNavigate()

    const renderOpenRoomsItem = () => rooms.map(room => {
        const handleClickRoom = () => {
            const encodedRoomName = encodeURI(room.name)
            navigate(`/room/${encodedRoomName}`)
        }

        return (
            <RoomListItem onClick={handleClickRoom} room={room} />
        )
    })

    return (
        <ListWrapper>
            <StyledRoomListFirstItem>
                <span>Room name</span>
                <span>Players</span>
                <span>Owner name</span>
            </StyledRoomListFirstItem>

            {isRoomsLoading 
                ? <h2>Loading...</h2>
                : rooms.length
                    ? renderOpenRoomsItem() 
                    : (
                        <StyledRoomListItemGrid>
                            <h1>Sorry, there are no open room</h1>
                        </StyledRoomListItemGrid>
                    )
            }
        </ListWrapper>
    )
}