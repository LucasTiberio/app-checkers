import { useCallback, useEffect } from "react";
import useUserStore from "../store/user";

export default function useUser() {
    const { user, setUser } = useUserStore();

    const setStorageNickname = (name: string) => localStorage.setItem("cached-name", name)
    const getStorageNickname = () => localStorage.getItem("cached-name")
    const deleteStorageNickname = () => localStorage.removeItem("cached-name")

    const login = useCallback((name: string) => {
        const userId = btoa(name)

        setStorageNickname(name);
        setUser({
            id: userId,
            name
        })
    }, [setUser])

    const logout = useCallback(() => {
        deleteStorageNickname()
        setUser(null)
    }, [setUser])

    useEffect(() => {
        if (!user) {
            const storageNickname = getStorageNickname();

            if (!storageNickname) {
                return;
            }
            
            login(storageNickname)
        }
    }, [login, user])

    return {
        user,
        login,
        logout,
    }
}