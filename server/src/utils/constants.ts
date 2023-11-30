import "dotenv/config"

// Express
export const ENV_EXPRESS_PORT = process.env.EXPRESS_PORT ? Number(process.env.EXPRESS_PORT) : 3002

// Http & Websocket
export const ENV_HTTP_PORT = process.env.HTTP_PORT ? Number(process.env.HTTP_PORT) : 3003

// Redis
export const ENV_REDIS_HOST = process.env.REDIS_HOST || ""
export const ENV_REDIS_PASSWORD = process.env.REDIS_PASSWORD || ""
export const ENV_REDIS_PORT = process.env.REDIS_PORT || ""
export const ENV_REDIS_USER = process.env.REDIS_USER || ""