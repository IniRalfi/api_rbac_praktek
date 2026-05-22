import { PrismaClient } from "@prisma/client";

type PermissionRef = { id: string };
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ─── PERMISSION SLUGS ────────────────────────────────────────────
const PERMISSIONS = [
  // Property
  "property:create",
  "property:read",
  "property:update",
  "property:delete",
  // Room
  "room:create",
  "room:read",
  "room:update",
  "room:delete",
  // Booking
  "booking:create",
  "booking:read:own",
  "booking:read:all",
  "booking:update:status",
  // Payment
  "payment:create",
  "payment:read:own",
  "payment:read:all",
  "payment:verify",
  // Report
  "report:create",
  "report:read:own",
  "report:read:all",
  "report:update:status",
  // User
  "user:read",
  "user:update",
  "user:delete",
];

// ─── ROLE → PERMISSION MAPPING ───────────────────────────────────
const ROLE_PERMISSIONS: Record<string, string[]> = {
  OWNER: [
    "property:create",
    "property:read",
    "property:update",
    "property:delete",
    "room:create",
    "room:read",
    "room:update",
    "room:delete",
    "booking:read:all",
    "booking:update:status",
    "payment:read:all",
    "payment:verify",
    "report:read:all",
    "report:update:status",
    "user:read",
    "user:update",
    "user:delete",
  ],
  OPERATOR: [
    "property:read",
    "room:read",
    "booking:read:all",
    "booking:update:status",
    "payment:read:all",
    "payment:verify",
    "report:read:all",
    "report:update:status",
  ],
  TENANT: [
    "property:read",
    "room:read",
    "booking:create",
    "booking:read:own",
    "payment:create",
    "payment:read:own",
    "report:create",
    "report:read:own",
  ],
};

async function main() {
  console.log("🌱 Seeding database...");

  // 1. Buat semua permissions
  console.log("  → Creating permissions...");
  await Promise.all(
    PERMISSIONS.map((slug) =>
      prisma.permission.upsert({
        where: { slug },
        update: {},
        create: { slug },
      })
    )
  );

  // 2. Buat roles + hubungkan ke permissions
  console.log("  → Creating roles...");
  for (const [roleName, slugs] of Object.entries(ROLE_PERMISSIONS)) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {
        permissions: {
          set: await prisma.permission
            .findMany({ where: { slug: { in: slugs } } })
            .then((perms: PermissionRef[]) => perms.map((p) => ({ id: p.id }))),
        },
      },
      create: {
        name: roleName,
        permissions: {
          connect: await prisma.permission
            .findMany({ where: { slug: { in: slugs } } })
            .then((perms: PermissionRef[]) => perms.map((p) => ({ id: p.id }))),
        },
      },
    });
  }

  // 3. Buat user owner default
  console.log("  → Creating default owner user...");
  const ownerRole = await prisma.role.findUnique({ where: { name: "OWNER" } });
  if (!ownerRole) throw new Error("Owner role not found");

  const hashedPassword = await bcrypt.hash("password123", 10);
  await prisma.user.upsert({
    where: { email: "owner@kostku.com" },
    update: {},
    create: {
      name: "Owner Default",
      email: "owner@kostku.com",
      password: hashedPassword,
      roleId: ownerRole.id,
    },
  });

  console.log("✅ Seeding selesai!");
  console.log("   Email: owner@kostku.com");
  console.log("   Password: password123");
}

main()
  .catch((e) => {
    console.error("❌ Seeding gagal:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
