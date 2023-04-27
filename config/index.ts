import dotenv from "dotenv";
dotenv.config();

export const {
  APP_PORT,
  DB_URL,
  DEBUG_MODE,
  HASH_SECRET,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
} = process.env;
