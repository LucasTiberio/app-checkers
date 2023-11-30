import { useEffect } from 'react'

export default function useClickOutside(onClickOutside: () => void, ref: React.RefObject<any>): void {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target)) onClickOutside()
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [onClickOutside, ref])
}