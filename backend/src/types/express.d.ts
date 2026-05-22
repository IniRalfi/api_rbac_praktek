// backend/src/types/express.d.ts

import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      // Menyimpan data user setelah JWT diverifikasi
      user?: {
        id: string;
        name: string;
        email: string;
        role: string; // contoh: "OWNER", "TENANT"
      };
      // Menyimpan daftar permission slug milik user tersebut
      permissions?: string[]; // contoh: ["property:read", "room:create"]
    }
  }
}
