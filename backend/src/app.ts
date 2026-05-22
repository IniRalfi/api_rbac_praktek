// backend/src/app.ts

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import { logger } from "./config/logger";

export const createApp = () => {
  const app = express();

  // 1. Security Headers (Helmet)
  app.use(helmet());

  // 2. CORS (Cross-Origin Resource Sharing)
  app.use(
    cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
    })
  );

  // 3. Body Parser (JSON & URL Encoded)
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // 4. Integrasi Morgan HTTP Logger dengan Winston Logger
  const morganFormat = env.NODE_ENV === "development" ? "dev" : "combined";
  app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );

  // 5. Health Check Route
  app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date() });
  });

  // 6. Global Error Handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(err.stack || err.message);
    res.status(err.status || 500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  });

  return app;
};
