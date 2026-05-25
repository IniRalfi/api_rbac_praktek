import jwt from "jsonwebtoken";
import { env } from "../../config/env";

// Tipe data payload yang akan disimpan didalam JWT
export interface TokenPayload {
  userId: string;
  role: string;
}

// Membyat token baru
export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as any,
  });
};

export const verifyToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
