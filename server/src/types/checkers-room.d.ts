export type RoomStatus = "WAITING" | "STARTED" | "FINISHED";

export type RoomMetadata = {
    nextPlayerType?: string;
    winner?: {
        id: string;
        name: string;
    };
}

export type Player = {
    id: string;
    name: string;
}

export interface Room {
    name: string
    status: RoomStatus
    ownerId: string;
    player1: Player
    player2?: Player
    password?: string
    board?: string[][]
    metadata?: RoomMetadata;
}