import { Redis, RedisOptions } from "ioredis"
import { ENV_REDIS_HOST, ENV_REDIS_PASSWORD, ENV_REDIS_PORT, ENV_REDIS_USER } from "../utils/constants";

let redisInstance: Redis | null = null;

export function getRedisInstance() {
    try {
        const options: RedisOptions = {
            host: ENV_REDIS_HOST,
            port: Number(ENV_REDIS_PORT),
            username: ENV_REDIS_USER,
            password: ENV_REDIS_PASSWORD,
            lazyConnect: true,
            showFriendlyErrorStack: true,
            enableAutoPipelining: true,
            connectTimeout: 3000,
        }

        if (!redisInstance){
            redisInstance = new Redis(options);
        }

        redisInstance.setMaxListeners(0);
        
        redisInstance.on("error", error => {
            console.error("[Redis] Error while connecting", error)
        })

        redisInstance.on("disconnect", () => {
            redisInstance = null;
        })

        redisInstance.on("connect", () => {
            console.log("[Redis] Successfully connected 🔥")
        })

        return redisInstance;
    } catch (error) {
        throw new Error(`[Redis] Error while creating instance`);
    }
}