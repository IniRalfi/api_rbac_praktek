// backend/src/constants/payment-status.ts

export const PAYMENT_STATUS = {
  PENDING: "PENDING", // Menunggu upload bukti transfer oleh Tenant
  VERIFYING: "VERIFYING", // Bukti transfer di-upload, menunggu verifikasi Owner
  APPROVED: "APPROVED", // Pembayaran sah dan disetujui
  REJECTED: "REJECTED", // Pembayaran ditolak (bukti palsu/salah nominal)
} as const;

export type PaymentStatusType = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
