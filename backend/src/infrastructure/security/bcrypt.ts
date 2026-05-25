import bcrypt from "bcryptjs";
import { env } from "../../config/env";

// Mengubah password plain text menjadi hash terenkripsi
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, env.SALT_ROUNDS);
};

// Mencocokkan password plain text dengan hash yang tersimpan di database
export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

