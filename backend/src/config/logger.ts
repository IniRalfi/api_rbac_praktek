// backend/src/config/logger.ts

import winston from "winston";
import { env } from "./env";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

// Format output log
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `[${info.timestamp}] [${info.level}]: ${info.message}`)
);

// Tentukan transports (ke mana log akan dikirim)
const transports = [
  // Tulis semua log ke console
  new winston.transports.Console(),
  // Tulis log error ke file error.log
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  // Tulis semua log ke file combined.log
  new winston.transports.File({ filename: "logs/combined.log" }),
];

// Buat instance logger
export const logger = winston.createLogger({
  level: env.NODE_ENV === "development" ? "debug" : "warn",
  levels,
  format,
  transports,
});
