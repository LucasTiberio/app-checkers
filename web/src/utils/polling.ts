export default function shortPolling(seconds: number, callback: () => void) {
    const interval = setInterval(() => {
        callback();
    }, 1000 * seconds)

    return interval;
}