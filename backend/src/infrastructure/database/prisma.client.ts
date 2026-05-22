// backend/src/infrastructure/database/prisma.client.ts

import { PrismaClient } from "@prisma/client";

// Inisialisasi Prisma Client sebagai singleton
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});
