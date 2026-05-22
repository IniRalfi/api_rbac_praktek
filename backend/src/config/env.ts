// backend/src/config/env.ts

import dotenv from "dotenv";

// Load environment variables dari file .env
dotenv.config();

// Definisikan struktur interface untuk env variable
interface EnvConfig {
  PORT: number;
  NODE_ENV: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  SALT_ROUNDS: number;
  CORS_ORIGIN: string;
}

// Fungsi helper untuk mengambil env dan memastikan datanya ada
const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`❌ Environment variable ${key} is missing!`);
  }
  return value;
};

// Export konfigurasi env yang sudah divalidasi
export const env: EnvConfig = {
  PORT: parseInt(getEnvVar("PORT", "4000"), 10),
  NODE_ENV: getEnvVar("NODE_ENV", "development"),
  DATABASE_URL: getEnvVar("DATABASE_URL"),
  JWT_SECRET: getEnvVar("JWT_SECRET"),
  JWT_EXPIRES_IN: getEnvVar("JWT_EXPIRES_IN", "7d"),
  SALT_ROUNDS: parseInt(getEnvVar("SALT_ROUNDS", "10"), 10),
  CORS_ORIGIN: getEnvVar("CORS_ORIGIN", "http://localhost:3000"),
};
