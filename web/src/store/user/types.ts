export type User = {
    id: string
    name: string;
}

export type UserStore = {
    user: User | null
    setUser: (user: User | null) => void;
}