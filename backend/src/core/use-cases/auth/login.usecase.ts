// backend/src/core/use-cases/auth/login.usecase.ts

import { UserRepository } from "../../../infrastructure/database/user.repository";
import { UserEntity } from "../../entities/user.entity";
import { comparePassword } from "../../../infrastructure/security/bcrypt";
import { generateToken } from "../../../infrastructure/security/jwt";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResult {
  user: UserEntity;
  token: string;
}

export class LoginUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: LoginInput): Promise<LoginResult> {
    // 1. Validasi: Cari user berdasarkan email
    const user = await this.userRepository.findByEmail(input.email);
    if (!user || !user.password) {
      throw new Error("Invalid email or password");
    }

    // 2. Keamanan: Bandingkan password input dengan password terenkripsi di database
    const isPasswordValid = await comparePassword(input.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // 3. Tokenisasi: Buat token JWT baru dengan payload userId dan roleName
    const token = generateToken({
      userId: user.id,
      role: user.roleName || "",
    });

    // 4. Mapping: Buat objek UserEntity baru tanpa menyertakan password untuk dikirim ke client
    const userWithoutPassword = new UserEntity(
      user.id,
      user.name,
      user.email,
      undefined, // Sembunyikan password
      user.phone,
      user.roleId,
      user.createdAt,
      user.updatedAt,
      user.roleName
    );

    return {
      user: userWithoutPassword,
      token,
    };
  }
}
