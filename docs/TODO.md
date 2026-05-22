# 📋 Kost-Ku — Progress Tracker

> **Stack:** Next.js · Bun.js · Express · Prisma · PostgreSQL · JWT · Clean Architecture  
> **Versi PRD:** 2.0.0  
> **Status:** 🚧 In Progress

---

## Cara Pakai Dokumen Ini

- ✅ = Selesai
- 🚧 = Sedang dikerjakan
- ⬜ = Belum dikerjakan
- Setiap phase dikerjakan **satu file / satu langkah** secara berurutan
- Update status di sini setiap selesai mengerjakan satu item

---

## Phase 1 — Setup Monorepo

> Tujuan: Menyiapkan struktur folder monorepo, konfigurasi dasar dua app (frontend & backend), dan file-file boilerplate.

| Status | Item | File / Aksi |
|--------|------|-------------|
| ✅ | Buat struktur folder monorepo `kost-ku/` dengan `frontend/` dan `backend/` | Folder structure |
| ✅ | Init `backend/` dengan Bun + Express | `backend/package.json`, `backend/index.ts` |
| ✅ | Init `frontend/` dengan `create-next-app` (Next.js 16 + TS + Tailwind) | `frontend/package.json`, `frontend/next.config.ts` |
| ✅ | Buat `.gitignore` global (node_modules, .env, .next, dist) | `.gitignore` |
| ✅ | Buat `README.md` project | `README.md` |
| ✅ | Setup file `.env` backend + `.env.local` frontend | `.env`, `.env.local` |
| ✅ | Setup `tsconfig.json` backend | `backend/tsconfig.json` |

---

## Phase 2 — Database (Prisma + PostgreSQL)

> Tujuan: Mendefinisikan semua model database, membuat migrasi, dan seed data awal (roles, permissions, user owner).

| Status | Item | File / Aksi |
|--------|------|-------------|
| ⬜ | Tulis `schema.prisma` — model User, Role, Permission | `backend/prisma/schema.prisma` |
| ⬜ | Tambah model Property, Room ke schema | `backend/prisma/schema.prisma` |
| ⬜ | Tambah model Booking, Payment, Report ke schema | `backend/prisma/schema.prisma` |
| ⬜ | Jalankan migrasi awal (`prisma migrate dev`) | CLI |
| ⬜ | Buat `seed.ts` — seed roles (OWNER, OPERATOR, TENANT) | `backend/prisma/seed.ts` |
| ⬜ | Tambah seed permissions (semua 22 slug) ke `seed.ts` | `backend/prisma/seed.ts` |
| ⬜ | Tambah seed user owner default ke `seed.ts` | `backend/prisma/seed.ts` |
| ⬜ | Jalankan seed (`bun prisma/seed.ts`) | CLI |

---

## Phase 3 — Backend Core (Config, Utils, Auth, RBAC)

> Tujuan: Menyiapkan fondasi backend — konfigurasi Express, layer utility, auth (register/login/me), dan RBAC middleware berbasis permission slug.

### 3.1 Config & Bootstrap

| Status | Item | File |
|--------|------|------|
| ⬜ | Setup Express app (middleware, CORS, Helmet, Morgan) | `backend/src/app.ts` |
| ⬜ | Entry point server | `backend/index.ts` |
| ⬜ | Validasi & export env variables | `backend/src/config/env.ts` |
| ⬜ | Setup Winston logger | `backend/src/config/logger.ts` |
| ⬜ | Singleton PrismaClient | `backend/src/infrastructure/database/prisma.client.ts` |
| ⬜ | Extend Express Request type (user, permissions) | `backend/src/types/express.d.ts` |

### 3.2 Constants

| Status | Item | File |
|--------|------|------|
| ⬜ | Enum roles | `backend/src/constants/roles.ts` |
| ⬜ | Semua permission slug | `backend/src/constants/permissions.ts` |
| ⬜ | Status booking | `backend/src/constants/booking-status.ts` |
| ⬜ | Status payment | `backend/src/constants/payment-status.ts` |
| ⬜ | Status report | `backend/src/constants/report-status.ts` |

### 3.3 Utils

| Status | Item | File |
|--------|------|------|
| ⬜ | Standard API response helper | `backend/src/utils/response.ts` |
| ⬜ | Pagination query helper | `backend/src/utils/pagination.ts` |
| ⬜ | Bcrypt wrapper | `backend/src/infrastructure/security/bcrypt.ts` |
| ⬜ | JWT wrapper (sign & verify) | `backend/src/infrastructure/security/jwt.ts` |

### 3.4 Auth

| Status | Item | File |
|--------|------|------|
| ⬜ | User entity | `backend/src/core/entities/user.entity.ts` |
| ⬜ | Role entity | `backend/src/core/entities/role.entity.ts` |
| ⬜ | User repository (findByEmail, findById, create) | `backend/src/infrastructure/database/user.repository.ts` |
| ⬜ | Register use case | `backend/src/core/use-cases/auth/register.usecase.ts` |
| ⬜ | Login use case | `backend/src/core/use-cases/auth/login.usecase.ts` |
| ⬜ | Auth controller (register, login, me) | `backend/src/interfaces/controllers/auth.controller.ts` |
| ⬜ | Auth routes | `backend/src/interfaces/routes/auth.routes.ts` |

### 3.5 Middleware

| Status | Item | File |
|--------|------|------|
| ⬜ | JWT auth middleware | `backend/src/interfaces/middlewares/auth.middleware.ts` |
| ⬜ | RBAC permission middleware | `backend/src/interfaces/middlewares/rbac.middleware.ts` |
| ⬜ | Joi validation middleware | `backend/src/interfaces/middlewares/validate.middleware.ts` |

---

## Phase 4 — Backend Domain (per Domain)

> Tujuan: Membangun 5 domain bisnis utama. Setiap domain mengikuti pola: **Entity → Repository → Use Case → Controller → Route**

### 4.1 Domain: Property

| Status | Item | File |
|--------|------|------|
| ⬜ | Property entity | `backend/src/core/entities/property.entity.ts` |
| ⬜ | Property repository | `backend/src/infrastructure/database/property.repository.ts` |
| ⬜ | Create property use case | `backend/src/core/use-cases/property/create-property.usecase.ts` |
| ⬜ | Get properties use case | `backend/src/core/use-cases/property/get-properties.usecase.ts` |
| ⬜ | Update property use case | `backend/src/core/use-cases/property/update-property.usecase.ts` |
| ⬜ | Delete property use case | `backend/src/core/use-cases/property/delete-property.usecase.ts` |
| ⬜ | Property controller | `backend/src/interfaces/controllers/property.controller.ts` |
| ⬜ | Property routes | `backend/src/interfaces/routes/property.routes.ts` |

### 4.2 Domain: Room

| Status | Item | File |
|--------|------|------|
| ⬜ | Room entity | `backend/src/core/entities/room.entity.ts` |
| ⬜ | Room repository | `backend/src/infrastructure/database/room.repository.ts` |
| ⬜ | Create room use case | `backend/src/core/use-cases/room/create-room.usecase.ts` |
| ⬜ | Get rooms use case (+ filter) | `backend/src/core/use-cases/room/get-rooms.usecase.ts` |
| ⬜ | Update room use case | `backend/src/core/use-cases/room/update-room.usecase.ts` |
| ⬜ | Delete room use case | `backend/src/core/use-cases/room/delete-room.usecase.ts` |
| ⬜ | Room controller | `backend/src/interfaces/controllers/room.controller.ts` |
| ⬜ | Room routes | `backend/src/interfaces/routes/room.routes.ts` |

### 4.3 Domain: Booking

| Status | Item | File |
|--------|------|------|
| ⬜ | Booking entity | `backend/src/core/entities/booking.entity.ts` |
| ⬜ | Booking repository | `backend/src/infrastructure/database/booking.repository.ts` |
| ⬜ | Create booking use case (cek availability + overlap) | `backend/src/core/use-cases/booking/create-booking.usecase.ts` |
| ⬜ | Get bookings use case (all & own) | `backend/src/core/use-cases/booking/get-bookings.usecase.ts` |
| ⬜ | Update booking status use case | `backend/src/core/use-cases/booking/update-booking-status.usecase.ts` |
| ⬜ | Booking controller | `backend/src/interfaces/controllers/booking.controller.ts` |
| ⬜ | Booking routes | `backend/src/interfaces/routes/booking.routes.ts` |

### 4.4 Domain: Payment

| Status | Item | File |
|--------|------|------|
| ⬜ | Payment entity | `backend/src/core/entities/payment.entity.ts` |
| ⬜ | Payment repository | `backend/src/infrastructure/database/payment.repository.ts` |
| ⬜ | Create payment use case | `backend/src/core/use-cases/payment/create-payment.usecase.ts` |
| ⬜ | Verify payment use case (update booking ke ACTIVE) | `backend/src/core/use-cases/payment/verify-payment.usecase.ts` |
| ⬜ | Get payments use case (all & own) | `backend/src/core/use-cases/payment/get-payments.usecase.ts` |
| ⬜ | Payment controller | `backend/src/interfaces/controllers/payment.controller.ts` |
| ⬜ | Payment routes | `backend/src/interfaces/routes/payment.routes.ts` |

### 4.5 Domain: Report

| Status | Item | File |
|--------|------|------|
| ⬜ | Report entity | `backend/src/core/entities/report.entity.ts` |
| ⬜ | Report repository | `backend/src/infrastructure/database/report.repository.ts` |
| ⬜ | Create report use case | `backend/src/core/use-cases/report/create-report.usecase.ts` |
| ⬜ | Get reports use case (all & own) | `backend/src/core/use-cases/report/get-reports.usecase.ts` |
| ⬜ | Update report status use case | `backend/src/core/use-cases/report/update-report-status.usecase.ts` |
| ⬜ | Report controller | `backend/src/interfaces/controllers/report.controller.ts` |
| ⬜ | Report routes | `backend/src/interfaces/routes/report.routes.ts` |

### 4.6 Domain: User (OWNER only)

| Status | Item | File |
|--------|------|------|
| ⬜ | User controller (list, update, delete) | `backend/src/interfaces/controllers/user.controller.ts` |
| ⬜ | User routes | `backend/src/interfaces/routes/user.routes.ts` |

---

## Phase 5 — Frontend Setup

> Tujuan: Menyiapkan fondasi frontend — layout dashboard, konfigurasi Axios, custom hooks, dan komponen shared.

| Status | Item | File |
|--------|------|------|
| ⬜ | Install & konfigurasi shadcn/ui | CLI + `components/ui/` |
| ⬜ | Setup Axios instance dengan base URL & auth header | `frontend/src/lib/api.ts` |
| ⬜ | Helper utils (cn, formatRupiah, formatDate) | `frontend/src/lib/utils.ts` |
| ⬜ | Konstanta global (API_URL, STATUS_LABELS) | `frontend/src/lib/constants.ts` |
| ⬜ | Type definitions (User, Room, Booking, dll) | `frontend/src/types/index.ts` |
| ⬜ | Hook useAuth (baca token & user) | `frontend/src/hooks/useAuth.ts` |
| ⬜ | Hook usePermission (cek permission slug) | `frontend/src/hooks/usePermission.ts` |
| ⬜ | Hook useApi (wrapper fetch ke backend) | `frontend/src/hooks/useApi.ts` |
| ⬜ | Root layout (font, theme) | `frontend/src/app/layout.tsx` |
| ⬜ | Dashboard layout (sidebar + topbar) | `frontend/src/app/(dashboard)/layout.tsx` |
| ⬜ | Komponen Sidebar (menu dinamis per role) | `frontend/src/components/layout/Sidebar.tsx` |
| ⬜ | Komponen Topbar | `frontend/src/components/layout/Topbar.tsx` |
| ⬜ | Komponen PageHeader | `frontend/src/components/layout/PageHeader.tsx` |
| ⬜ | Komponen StatusBadge | `frontend/src/components/shared/StatusBadge.tsx` |
| ⬜ | Komponen DataTable (generik + pagination) | `frontend/src/components/shared/DataTable.tsx` |
| ⬜ | Komponen ConfirmDialog | `frontend/src/components/shared/ConfirmDialog.tsx` |
| ⬜ | Komponen EmptyState | `frontend/src/components/shared/EmptyState.tsx` |
| ⬜ | Komponen LoadingSpinner | `frontend/src/components/shared/LoadingSpinner.tsx` |

---

## Phase 6 — Frontend Auth

> Tujuan: Halaman login & register, simpan JWT, dan redirect otomatis sesuai role.

| Status | Item | File |
|--------|------|------|
| ⬜ | Landing page (hero, fitur, CTA) | `frontend/src/app/page.tsx` |
| ⬜ | Halaman Login | `frontend/src/app/(auth)/login/page.tsx` |
| ⬜ | Halaman Register | `frontend/src/app/(auth)/register/page.tsx` |
| ⬜ | Route protection (redirect jika belum login) | Logic di layout / middleware |

---

## Phase 7 — Frontend OWNER

> Tujuan: Halaman khusus OWNER untuk kelola properti, kamar, overview, dan manajemen user.

| Status | Item | File |
|--------|------|------|
| ⬜ | Halaman Overview (statistik sesuai role) | `frontend/src/app/(dashboard)/overview/page.tsx` |
| ⬜ | Halaman Properti (daftar + aksi CRUD) | `frontend/src/app/(dashboard)/properties/page.tsx` |
| ⬜ | Halaman Tambah Properti | `frontend/src/app/(dashboard)/properties/create/page.tsx` |
| ⬜ | Halaman Detail Properti (kamar-kamar) | `frontend/src/app/(dashboard)/properties/[id]/page.tsx` |
| ⬜ | Halaman Manajemen User | `frontend/src/app/(dashboard)/users/page.tsx` |

---

## Phase 8 — Frontend TENANT

> Tujuan: Halaman TENANT untuk browse kamar, booking, upload bukti bayar, dan lapor kerusakan.

| Status | Item | File |
|--------|------|------|
| ⬜ | Halaman Daftar Kamar (filter: properti, tipe, harga) | `frontend/src/app/(dashboard)/rooms/page.tsx` |
| ⬜ | Halaman Detail Kamar (+ tombol booking) | `frontend/src/app/(dashboard)/rooms/[id]/page.tsx` |
| ⬜ | Halaman Booking Saya | `frontend/src/app/(dashboard)/bookings/page.tsx` |
| ⬜ | Halaman Detail Booking (+ upload bukti bayar) | `frontend/src/app/(dashboard)/bookings/[id]/page.tsx` |
| ⬜ | Halaman Pembayaran Saya | `frontend/src/app/(dashboard)/payments/page.tsx` |
| ⬜ | Halaman Laporan Kerusakan (buat + lihat) | `frontend/src/app/(dashboard)/reports/page.tsx` |

---

## Phase 9 — Frontend OWNER & OPERATOR

> Tujuan: Halaman manajemen booking, verifikasi pembayaran, dan update status laporan.

| Status | Item | File |
|--------|------|------|
| ⬜ | Halaman Semua Booking (konfirmasi/tolak) | `frontend/src/app/(dashboard)/bookings/page.tsx` (shared, render berbeda per role) |
| ⬜ | Halaman Detail Booking (view + aksi status) | `frontend/src/app/(dashboard)/bookings/[id]/page.tsx` |
| ⬜ | Halaman Semua Pembayaran (verifikasi/tolak) | `frontend/src/app/(dashboard)/payments/page.tsx` |
| ⬜ | Halaman Semua Laporan (update status) | `frontend/src/app/(dashboard)/reports/page.tsx` |

---

## Phase 10 — Polish & Finalisasi

> Tujuan: Memastikan semua halaman memiliki loading state, empty state, dan error handling yang baik. Merapikan README untuk portofolio.

| Status | Item | File / Aksi |
|--------|------|-------------|
| ⬜ | Loading state di semua halaman (Suspense / skeleton) | Semua page |
| ⬜ | Empty state jika data kosong | Semua halaman tabel |
| ⬜ | Error boundary / toast notifikasi | Global |
| ⬜ | Responsive check (mobile, tablet, desktop) | Semua halaman |
| ⬜ | README lengkap (setup, screenshot, fitur) | `README.md` |
| ⬜ | Screenshot / demo video | `docs/screenshots/` |

---

## Ringkasan Progress

| Phase | Nama | Total Item | Selesai |
|-------|------|-----------|---------|
| 1 | Setup Monorepo | 7 | 0 |
| 2 | Database | 8 | 0 |
| 3 | Backend Core | 26 | 0 |
| 4 | Backend Domain | 42 | 0 |
| 5 | Frontend Setup | 18 | 0 |
| 6 | Frontend Auth | 4 | 0 |
| 7 | Frontend OWNER | 5 | 0 |
| 8 | Frontend TENANT | 6 | 0 |
| 9 | Frontend OWNER & OPERATOR | 4 | 0 |
| 10 | Polish | 6 | 0 |
| | **Total** | **126** | **0** |

---

*Dokumen ini diperbarui setiap kali satu item selesai dikerjakan.*
