// backend/src/core/use-cases/auth/register.usecase.ts

import { UserRepository } from "../../../infrastructure/database/user.repository";
import { UserEntity } from "../../entities/user.entity";
import { hashPassword } from "../../../infrastructure/security/bcrypt";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
  roleName: string;
}

export class RegisterUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: RegisterInput): Promise<UserEntity> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error("Email already registered");
    }

    // Enkripsi Hash
    const passwordHash = await hashPassword(input.password);

    return this.userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
      phone: input.phone,
      roleName: input.roleName,
    });
  }
}
