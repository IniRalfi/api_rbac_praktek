import { prisma } from "./prisma.client";
import { UserEntity } from "../../core/entities/user.entity";

export class UserRepository {
  // 1. Mencari user berdasarkan email
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) return null;

    return new UserEntity(
      user.id,
      user.name,
      user.email,
      user.password, // simpan password hash untuk verifikasi login
      user.phone,
      user.roleId,
      user.createdAt,
      user.updatedAt,
      user.role.name
    );
  }
  // 2. Mencari user berdasarkan ID
  async findById(id: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { role: true },
    });
    if (!user) return null;
    return new UserEntity(
      user.id,
      user.name,
      user.email,
      undefined, // hapus password saat mengambil data profile untuk keamanan
      user.phone,
      user.roleId,
      user.createdAt,
      user.updatedAt,
      user.role.name
    );
  }
  // 3. Membuat user baru (untuk registrasi)
  async create(data: {
    name: string;
    email: string;
    passwordHash: string;
    phone?: string;
    roleName: string;
  }): Promise<UserEntity> {
    // Cari roleId dari nama role (OWNER, OPERATOR, TENANT)
    const role = await prisma.role.findUnique({
      where: { name: data.roleName },
    });
    if (!role) {
      throw new Error(`Role ${data.roleName} not found`);
    }
    // Insert user baru ke database
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.passwordHash,
        phone: data.phone || null,
        roleId: role.id,
      },
    });
    return new UserEntity(
      user.id,
      user.name,
      user.email,
      undefined, // sembunyikan password saat return
      user.phone,
      user.roleId,
      user.createdAt,
      user.updatedAt
    );
  }
}
