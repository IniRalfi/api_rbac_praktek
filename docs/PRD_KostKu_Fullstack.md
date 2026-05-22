# PRD — Kost-Ku (Fullstack Monorepo)
**Versi:** 2.0.0
**Tipe:** Fullstack Monorepo (Manual)
**Stack:** Next.js · Bun.js · Express · Prisma · PostgreSQL · JWT · Clean Architecture
**Status:** Draft

---

## 1. Gambaran Umum

**Kost-Ku** adalah aplikasi fullstack untuk mengelola bisnis kost-kostan secara digital. Dibangun sebagai monorepo manual dengan dua aplikasi terpisah: `frontend` (Next.js) dan `backend` (Bun.js + Express + Clean Architecture).

Sistem ini memungkinkan:
- **Pemilik kost (Owner)** mengelola properti, kamar, dan memantau keuangan
- **Pengelola (Operator)** menangani operasional harian: konfirmasi booking, verifikasi pembayaran, dan laporan kerusakan
- **Penyewa (Tenant)** mencari kamar, melakukan reservasi, membayar, dan melapor kerusakan — semua lewat antarmuka web yang bersih

Kontrol akses menggunakan **RBAC berbasis permission slug** (improvement dari project dosen yang hanya cek nama role).

---

## 2. Tujuan Proyek

- Membangun aplikasi fullstack yang bisa langsung dipakai sebagai portofolio
- Menerapkan Clean Architecture di sisi backend dengan pemisahan layer yang tegas
- Mengimplementasikan RBAC granular berbasis permission slug
- Membangun UI yang modern, responsif, dan mudah dipahami siapapun
- Belajar pola monorepo manual: shared types, API contract, dan deployment strategy

---

## 3. Struktur Monorepo

```
kost-ku/
├── README.md
├── .gitignore                    # ignore node_modules, .env, .next, dist
│
├── frontend/                     # Next.js App
│   ├── package.json
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── .env.local                # NEXT_PUBLIC_API_URL=http://localhost:4000
│   │
│   └── src/
│       ├── app/                  # Next.js App Router
│       │   ├── layout.tsx        # Root layout (font, theme provider)
│       │   ├── page.tsx          # Landing page / redirect
│       │   │
│       │   ├── (auth)/           # Route group: halaman publik
│       │   │   ├── login/
│       │   │   │   └── page.tsx
│       │   │   └── register/
│       │   │       └── page.tsx
│       │   │
│       │   └── (dashboard)/      # Route group: halaman setelah login
│       │       ├── layout.tsx    # Dashboard layout (sidebar, topbar)
│       │       │
│       │       ├── overview/     # Halaman utama per role
│       │       │   └── page.tsx
│       │       │
│       │       ├── properties/   # OWNER: manajemen properti
│       │       │   ├── page.tsx
│       │       │   ├── [id]/
│       │       │   │   └── page.tsx
│       │       │   └── create/
│       │       │       └── page.tsx
│       │       │
│       │       ├── rooms/        # Daftar & detail kamar
│       │       │   ├── page.tsx
│       │       │   └── [id]/
│       │       │       └── page.tsx
│       │       │
│       │       ├── bookings/     # Manajemen booking
│       │       │   ├── page.tsx
│       │       │   └── [id]/
│       │       │       └── page.tsx
│       │       │
│       │       ├── payments/     # Manajemen pembayaran
│       │       │   └── page.tsx
│       │       │
│       │       ├── reports/      # Laporan kerusakan
│       │       │   └── page.tsx
│       │       │
│       │       └── users/        # OWNER: manajemen user
│       │           └── page.tsx
│       │
│       ├── components/
│       │   ├── ui/               # shadcn/ui components (auto-generated)
│       │   │   ├── button.tsx
│       │   │   ├── card.tsx
│       │   │   ├── badge.tsx
│       │   │   ├── dialog.tsx
│       │   │   ├── table.tsx
│       │   │   ├── form.tsx
│       │   │   ├── input.tsx
│       │   │   ├── select.tsx
│       │   │   └── ...
│       │   │
│       │   ├── layout/           # Komponen layout
│       │   │   ├── Sidebar.tsx
│       │   │   ├── Topbar.tsx
│       │   │   └── PageHeader.tsx
│       │   │
│       │   └── shared/           # Komponen reusable
│       │       ├── StatusBadge.tsx       # Badge untuk status booking/payment/report
│       │       ├── DataTable.tsx         # Tabel generik dengan pagination
│       │       ├── ConfirmDialog.tsx     # Dialog konfirmasi aksi
│       │       ├── EmptyState.tsx        # State kosong
│       │       └── LoadingSpinner.tsx
│       │
│       ├── hooks/                # Custom React hooks
│       │   ├── useAuth.ts        # Baca token, user dari cookie/localStorage
│       │   ├── usePermission.ts  # Cek permission slug di frontend
│       │   └── useApi.ts         # Wrapper fetch ke backend
│       │
│       ├── lib/
│       │   ├── api.ts            # Axios/fetch instance dengan base URL & auth header
│       │   ├── utils.ts          # cn(), formatRupiah(), formatDate()
│       │   └── constants.ts      # API_URL, STATUS_LABELS, dll
│       │
│       └── types/
│           └── index.ts          # Type definitions (User, Room, Booking, dll)
│                                 # Mirror dari backend — dijaga sinkron manual
│
└── backend/                      # Bun.js + Express API
    ├── index.ts                  # Entry point
    ├── package.json
    ├── tsconfig.json
    ├── prisma.config.ts
    ├── .env                      # DATABASE_URL, JWT_SECRET, PORT, CORS_ORIGIN
    │
    ├── prisma/
    │   ├── schema.prisma
    │   ├── seed.ts
    │   └── migrations/
    │
    └── src/
        ├── app.ts                # Express setup, middleware, routes, CORS
        │
        ├── config/
        │   ├── env.ts            # Validasi & export env variables
        │   └── logger.ts         # Winston logger
        │
        ├── constants/
        │   ├── roles.ts          # Enum: OWNER, OPERATOR, TENANT
        │   ├── permissions.ts    # Semua slug permission
        │   ├── booking-status.ts # PENDING | CONFIRMED | REJECTED | ACTIVE | ENDED
        │   ├── payment-status.ts # PENDING | VERIFIED | REJECTED
        │   └── report-status.ts  # OPEN | IN_PROGRESS | RESOLVED
        │
        ├── core/
        │   ├── entities/
        │   │   ├── user.entity.ts
        │   │   ├── role.entity.ts
        │   │   ├── property.entity.ts
        │   │   ├── room.entity.ts
        │   │   ├── booking.entity.ts
        │   │   ├── payment.entity.ts
        │   │   └── report.entity.ts
        │   │
        │   └── use-cases/
        │       ├── auth/
        │       │   ├── register.usecase.ts
        │       │   └── login.usecase.ts
        │       ├── property/
        │       │   ├── create-property.usecase.ts
        │       │   ├── get-properties.usecase.ts
        │       │   ├── update-property.usecase.ts
        │       │   └── delete-property.usecase.ts
        │       ├── room/
        │       │   ├── create-room.usecase.ts
        │       │   ├── get-rooms.usecase.ts
        │       │   ├── update-room.usecase.ts
        │       │   └── delete-room.usecase.ts
        │       ├── booking/
        │       │   ├── create-booking.usecase.ts
        │       │   ├── get-bookings.usecase.ts
        │       │   └── update-booking-status.usecase.ts
        │       ├── payment/
        │       │   ├── create-payment.usecase.ts
        │       │   ├── verify-payment.usecase.ts
        │       │   └── get-payments.usecase.ts
        │       └── report/
        │           ├── create-report.usecase.ts
        │           ├── get-reports.usecase.ts
        │           └── update-report-status.usecase.ts
        │
        ├── infrastructure/
        │   ├── database/
        │   │   ├── prisma.client.ts          # Singleton PrismaClient
        │   │   ├── user.repository.ts
        │   │   ├── property.repository.ts
        │   │   ├── room.repository.ts
        │   │   ├── booking.repository.ts
        │   │   ├── payment.repository.ts
        │   │   └── report.repository.ts
        │   │
        │   └── security/
        │       ├── bcrypt.ts
        │       └── jwt.ts
        │
        ├── interfaces/
        │   ├── controllers/
        │   │   ├── auth.controller.ts
        │   │   ├── property.controller.ts
        │   │   ├── room.controller.ts
        │   │   ├── booking.controller.ts
        │   │   ├── payment.controller.ts
        │   │   ├── report.controller.ts
        │   │   └── user.controller.ts
        │   │
        │   ├── middlewares/
        │   │   ├── auth.middleware.ts        # Verifikasi JWT
        │   │   ├── rbac.middleware.ts        # Cek permission slug
        │   │   └── validate.middleware.ts    # Joi validation
        │   │
        │   └── routes/
        │       ├── auth.routes.ts
        │       ├── property.routes.ts
        │       ├── room.routes.ts
        │       ├── booking.routes.ts
        │       ├── payment.routes.ts
        │       ├── report.routes.ts
        │       └── user.routes.ts
        │
        ├── types/
        │   └── express.d.ts                  # Extend Request: user, permissions
        │
        └── utils/
            ├── response.ts                   # Standard API response helper
            └── pagination.ts                 # Pagination query helper

```

---

## 4. Aktor & Role

| Role | Deskripsi |
|------|-----------|
| `OWNER` | Pemilik kost — kelola properti, kamar, pantau semua data |
| `OPERATOR` | Pengelola harian — konfirmasi booking, verifikasi bayar, tangani laporan |
| `TENANT` | Penyewa — cari kamar, booking, bayar, lapor kerusakan |

---

## 5. Permission Slug & Matriks Akses

### Daftar Permission

| Slug | Deskripsi |
|------|-----------|
| `property:create` | Tambah properti |
| `property:read` | Lihat properti |
| `property:update` | Edit properti |
| `property:delete` | Hapus properti |
| `room:create` | Tambah kamar |
| `room:read` | Lihat kamar |
| `room:update` | Edit kamar |
| `room:delete` | Hapus kamar |
| `booking:create` | Buat booking |
| `booking:read:own` | Lihat booking sendiri |
| `booking:read:all` | Lihat semua booking |
| `booking:update:status` | Ubah status booking |
| `payment:create` | Upload bukti bayar |
| `payment:read:own` | Lihat pembayaran sendiri |
| `payment:read:all` | Lihat semua pembayaran |
| `payment:verify` | Verifikasi pembayaran |
| `report:create` | Buat laporan kerusakan |
| `report:read:own` | Lihat laporan sendiri |
| `report:read:all` | Lihat semua laporan |
| `report:update:status` | Update status laporan |
| `user:read` | Lihat daftar user |
| `user:update` | Edit user |
| `user:delete` | Hapus user |

### Matriks Role × Permission

| Permission | OWNER | OPERATOR | TENANT |
|---|:---:|:---:|:---:|
| `property:create/update/delete` | ✅ | ❌ | ❌ |
| `property:read` | ✅ | ✅ | ✅ |
| `room:create/update/delete` | ✅ | ❌ | ❌ |
| `room:read` | ✅ | ✅ | ✅ |
| `booking:create` | ❌ | ❌ | ✅ |
| `booking:read:all` | ✅ | ✅ | ❌ |
| `booking:read:own` | ❌ | ❌ | ✅ |
| `booking:update:status` | ✅ | ✅ | ❌ |
| `payment:create` | ❌ | ❌ | ✅ |
| `payment:read:all` | ✅ | ✅ | ❌ |
| `payment:read:own` | ❌ | ❌ | ✅ |
| `payment:verify` | ✅ | ✅ | ❌ |
| `report:create` | ❌ | ❌ | ✅ |
| `report:read:all` | ✅ | ✅ | ❌ |
| `report:read:own` | ❌ | ❌ | ✅ |
| `report:update:status` | ✅ | ✅ | ❌ |
| `user:read/update/delete` | ✅ | ❌ | ❌ |

---

## 6. Skema Database (PostgreSQL + Prisma)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id         String     @id @default(uuid())
  name       String
  email      String     @unique
  phone      String?
  password   String
  roleId     String
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt

  role       Role       @relation(fields: [roleId], references: [id])
  bookings   Booking[]
  payments   Payment[]
  reports    Report[]
  properties Property[]
}

model Role {
  id          String       @id @default(uuid())
  name        String       @unique
  users       User[]
  permissions Permission[] @relation("PermissionToRole")
}

model Permission {
  id    String @id @default(uuid())
  slug  String @unique
  roles Role[] @relation("PermissionToRole")
}

model Property {
  id          String   @id @default(uuid())
  name        String
  address     String
  description String?
  ownerId     String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  owner       User     @relation(fields: [ownerId], references: [id])
  rooms       Room[]
}

model Room {
  id          String    @id @default(uuid())
  propertyId  String
  number      String
  type        String
  price       Int
  isAvailable Boolean   @default(true)
  description String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  property    Property  @relation(fields: [propertyId], references: [id])
  bookings    Booking[]
  reports     Report[]
}

model Booking {
  id         String    @id @default(uuid())
  roomId     String
  tenantId   String
  startDate  DateTime
  endDate    DateTime
  status     String    @default("PENDING")
  totalPrice Int
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt

  room       Room      @relation(fields: [roomId], references: [id])
  tenant     User      @relation(fields: [tenantId], references: [id])
  payments   Payment[]
}

model Payment {
  id        String   @id @default(uuid())
  bookingId String
  tenantId  String
  amount    Int
  method    String
  proofUrl  String?
  status    String   @default("PENDING")
  note      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  booking   Booking  @relation(fields: [bookingId], references: [id])
  tenant    User     @relation(fields: [tenantId], references: [id])
}

model Report {
  id          String   @id @default(uuid())
  tenantId    String
  roomId      String
  title       String
  description String
  status      String   @default("OPEN")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  tenant      User     @relation(fields: [tenantId], references: [id])
  room        Room     @relation(fields: [roomId], references: [id])
}
```

---

## 7. Halaman Frontend (Next.js)

### Halaman Publik (tanpa login)

| Route | Halaman | Deskripsi |
|-------|---------|-----------|
| `/` | Landing Page | Hero, fitur, CTA daftar/masuk |
| `/login` | Login | Form email + password |
| `/register` | Register | Form nama, email, password (default role: TENANT) |

### Dashboard — semua role
| Route | Halaman | Deskripsi |
|-------|---------|-----------|
| `/overview` | Overview | Ringkasan data sesuai role masing-masing |
| `/rooms` | Daftar Kamar | Lihat kamar tersedia (filter: properti, tipe, harga) |
| `/rooms/:id` | Detail Kamar | Info kamar, tombol booking (TENANT) |

### Dashboard — TENANT
| Route | Halaman | Deskripsi |
|-------|---------|-----------|
| `/bookings` | Booking Saya | Daftar booking + status |
| `/bookings/:id` | Detail Booking | Info booking + tombol upload bukti bayar |
| `/payments` | Pembayaran Saya | Riwayat pembayaran |
| `/reports` | Laporan Saya | Buat & lihat laporan kerusakan |

### Dashboard — OWNER & OPERATOR
| Route | Halaman | Deskripsi |
|-------|---------|-----------|
| `/bookings` | Semua Booking | Tabel booking + konfirmasi/tolak |
| `/payments` | Semua Pembayaran | Tabel pembayaran + verifikasi/tolak |
| `/reports` | Semua Laporan | Tabel laporan + update status |

### Dashboard — OWNER only
| Route | Halaman | Deskripsi |
|-------|---------|-----------|
| `/properties` | Properti | Daftar properti milik owner |
| `/properties/create` | Tambah Properti | Form tambah properti |
| `/properties/:id` | Detail Properti | Kamar-kamar dalam properti |
| `/users` | Manajemen User | Daftar semua user, bisa hapus/edit |

---

## 8. Daftar Endpoint Backend API

### Auth
| Method | Endpoint | Permission | Deskripsi |
|--------|----------|-----------|-----------|
| POST | `/api/auth/register` | Public | Daftar akun baru |
| POST | `/api/auth/login` | Public | Login, dapat JWT |
| GET | `/api/auth/me` | Auth | Profil + permissions sendiri |

### Property
| Method | Endpoint | Permission | Deskripsi |
|--------|----------|-----------|-----------|
| GET | `/api/properties` | `property:read` | Daftar properti |
| GET | `/api/properties/:id` | `property:read` | Detail properti |
| POST | `/api/properties` | `property:create` | Tambah properti |
| PATCH | `/api/properties/:id` | `property:update` | Edit properti |
| DELETE | `/api/properties/:id` | `property:delete` | Hapus properti |

### Room
| Method | Endpoint | Permission | Deskripsi |
|--------|----------|-----------|-----------|
| GET | `/api/rooms` | `room:read` | Daftar kamar (filter: propertyId, isAvailable, type) |
| GET | `/api/rooms/:id` | `room:read` | Detail kamar |
| POST | `/api/rooms` | `room:create` | Tambah kamar |
| PATCH | `/api/rooms/:id` | `room:update` | Edit kamar |
| DELETE | `/api/rooms/:id` | `room:delete` | Hapus kamar |

### Booking
| Method | Endpoint | Permission | Deskripsi |
|--------|----------|-----------|-----------|
| POST | `/api/bookings` | `booking:create` | Buat booking |
| GET | `/api/bookings` | `booking:read:all` | Semua booking |
| GET | `/api/bookings/my` | `booking:read:own` | Booking sendiri |
| GET | `/api/bookings/:id` | Auth | Detail booking |
| PATCH | `/api/bookings/:id/status` | `booking:update:status` | Konfirmasi/tolak |

### Payment
| Method | Endpoint | Permission | Deskripsi |
|--------|----------|-----------|-----------|
| POST | `/api/payments` | `payment:create` | Upload bukti bayar |
| GET | `/api/payments` | `payment:read:all` | Semua pembayaran |
| GET | `/api/payments/my` | `payment:read:own` | Pembayaran sendiri |
| PATCH | `/api/payments/:id/verify` | `payment:verify` | Verifikasi/tolak |

### Report
| Method | Endpoint | Permission | Deskripsi |
|--------|----------|-----------|-----------|
| POST | `/api/reports` | `report:create` | Buat laporan |
| GET | `/api/reports` | `report:read:all` | Semua laporan |
| GET | `/api/reports/my` | `report:read:own` | Laporan sendiri |
| PATCH | `/api/reports/:id/status` | `report:update:status` | Update status |

### User
| Method | Endpoint | Permission | Deskripsi |
|--------|----------|-----------|-----------|
| GET | `/api/users` | `user:read` | Daftar semua user |
| PATCH | `/api/users/:id` | `user:update` | Edit user |
| DELETE | `/api/users/:id` | `user:delete` | Hapus user |

---

## 9. Standar Response API

**Success:**
```json
{
  "status": "success",
  "message": "Booking berhasil dibuat",
  "data": { }
}
```

**Success + Pagination:**
```json
{
  "status": "success",
  "message": "Berhasil mengambil data kamar",
  "data": [ ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

**Error:**
```json
{
  "status": "error",
  "message": "Kamar tidak tersedia untuk tanggal tersebut"
}
```

**Validation Error:**
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Email tidak valid" },
    { "field": "startDate", "message": "Tanggal mulai wajib diisi" }
  ]
}
```

---

## 10. Alur Bisnis Utama

### Alur 1: Tenant Booking Kamar
```
1. TENANT → GET /api/rooms?isAvailable=true     (lihat kamar kosong)
2. TENANT → POST /api/bookings                  (buat booking → status: PENDING)
3. OWNER/OPERATOR → PATCH /api/bookings/:id/status (konfirmasi → CONFIRMED)
4. TENANT → POST /api/payments                  (upload bukti bayar → status: PENDING)
5. OWNER/OPERATOR → PATCH /api/payments/:id/verify (verifikasi → VERIFIED)
6. Booking otomatis → status: ACTIVE, Room → isAvailable: false
```

### Alur 2: Tenant Lapor Kerusakan
```
1. TENANT → POST /api/reports                       (buat laporan → status: OPEN)
2. OPERATOR → GET /api/reports                      (lihat semua laporan)
3. OPERATOR → PATCH /api/reports/:id/status         (update → IN_PROGRESS)
4. Setelah selesai diperbaiki → RESOLVED
```

### Alur 3: Owner Setup Kost
```
1. OWNER → POST /api/properties                 (tambah properti)
2. OWNER → POST /api/rooms (x berapa kamar)     (tambah kamar)
3. OWNER → GET /api/bookings                    (pantau booking)
4. OWNER → GET /api/payments                    (pantau pembayaran)
```

---

## 11. Aturan Bisnis (Business Rules)

- Booking hanya bisa dibuat untuk kamar dengan `isAvailable: true`
- Tidak bisa booking kamar yang tanggalnya overlap dengan booking aktif lain
- Setelah booking `CONFIRMED` dan payment `VERIFIED` → booking jadi `ACTIVE`, kamar jadi `isAvailable: false`
- Jika booking `REJECTED` atau `ENDED` → kamar otomatis `isAvailable: true`
- Payment hanya bisa dibuat untuk booking berstatus `CONFIRMED` atau `ACTIVE`
- TENANT hanya bisa melihat dan berinteraksi dengan data miliknya sendiri
- OWNER hanya bisa mengelola properti dan kamar yang dia buat
- Sidebar dan menu navigasi frontend menyesuaikan role secara otomatis

---

## 12. Tech Stack Lengkap

### Frontend
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Next.js | 15.x | React framework (App Router) |
| React | 19.x | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling utility-first |
| shadcn/ui | latest | Komponen UI siap pakai |
| Axios | ^1.x | HTTP client ke backend API |
| React Hook Form | ^7.x | Form management |
| Zod | ^3.x | Schema validation (sisi frontend) |
| js-cookie / localStorage | — | Simpan JWT token |

### Backend
| Teknologi | Versi | Fungsi |
|-----------|-------|--------|
| Bun.js | latest | Runtime & package manager |
| Express | ^5.x | HTTP framework |
| Prisma | ^6.x | ORM |
| PostgreSQL | 16.x | Database |
| jsonwebtoken | ^9.x | JWT auth |
| bcryptjs | ^2.x | Hash password |
| Joi | ^17.x | Request validation |
| Helmet | ^8.x | Security headers |
| Morgan | ^1.x | Request logger |
| Winston | ^3.x | App logger |
| cors | ^2.x | CORS (allow frontend origin) |
| dotenv | latest | Environment variables |

---

## 13. Environment Variables

### `backend/.env`
```env
PORT=4000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:password@localhost:5432/kostku_db?schema=public"
JWT_SECRET="ganti-dengan-string-panjang-dan-random"
JWT_EXPIRES_IN="7d"
SALT_ROUNDS=10
CORS_ORIGIN="http://localhost:3000"
```

### `frontend/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

---

## 14. Milestone Pengerjaan

| Fase | Pekerjaan |
|------|-----------|
| **1. Setup Monorepo** | Buat folder `kost-ku/`, init `backend/` dengan Bun, init `frontend/` dengan `create-next-app`, setup `.gitignore` global |
| **2. Database** | Tulis `schema.prisma` PostgreSQL, migrasi, `seed.ts` (roles + permissions + owner default) |
| **3. Backend Core** | Auth (register/login/me), RBAC middleware upgrade ke permission slug, standard response helper |
| **4. Backend Domain** | Property → Room → Booking → Payment → Report → User (masing-masing: Repository → Use Case → Controller → Route) |
| **5. Frontend Setup** | Install shadcn/ui, buat layout dashboard (Sidebar + Topbar), setup Axios instance, `useAuth` hook, `usePermission` hook |
| **6. Frontend Auth** | Halaman login & register, simpan token, redirect sesuai role |
| **7. Frontend OWNER** | Halaman properti, tambah kamar, overview statistik |
| **8. Frontend TENANT** | Halaman kamar, booking, upload bukti bayar, laporan kerusakan |
| **9. Frontend OPERATOR** | Halaman konfirmasi booking, verifikasi pembayaran, update laporan |
| **10. Polish** | Loading state, empty state, error handling UI, README lengkap, screenshot demo |

---

## 15. Improvement dari Project Dosen

| Aspek | Project Dosen | Kost-Ku |
|-------|--------------|---------|
| Scope | Backend only | Fullstack (frontend + backend) |
| Database | MySQL | PostgreSQL |
| RBAC | Cek nama role string | Permission slug granular |
| Domain | Auth saja | 6 domain: Auth, Property, Room, Booking, Payment, Report |
| Response | Tidak konsisten | Standar di semua endpoint |
| Validation | Belum ada | Joi (backend) + Zod (frontend) |
| Frontend | Tidak ada | Next.js App Router + shadcn/ui |
| Auth frontend | Tidak ada | JWT di cookie, route protection, sidebar dinamis |

---

*Versi 2.0.0 — Fullstack Monorepo. Detail implementasi bisa disesuaikan selama fase pengerjaan.*
