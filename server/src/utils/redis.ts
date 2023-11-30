import { Redis } from "ioredis";

export async function getAllKeysByPattern(redisInstance: Redis, startsWith: string) {
    try {
        const keys = await redisInstance.keys('*');

        const filteresKeys = keys
            .filter(key => key.startsWith(startsWith))

        const keysData = await Promise.all(
            filteresKeys.map(key => 
                redisInstance.get(key)
                    .then(data => JSON.parse(data || ""))
            )
        )

        return keysData;
    } catch (error) {
        throw error;
    }
}