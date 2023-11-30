import { useEffect, useState } from "react"

export default function useActiveWindow() {
    const [isWindowActive, setWindowActive] = useState(false);

    useEffect(() => {
        const onVisibilityChange = () => {
            setWindowActive(document.visibilityState === "visible")
        }

        document.addEventListener("visibilitychange", onVisibilityChange);
        onVisibilityChange(); // First load

        return () => {
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
  }, []);

    return {
        isWindowActive,
    }
}