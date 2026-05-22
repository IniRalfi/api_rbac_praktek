// backend/src/constants/booking-status.ts

export const BOOKING_STATUS = {
  PENDING: "PENDING", // Menunggu persetujuan Owner/Operator
  APPROVED: "APPROVED", // Booking disetujui
  REJECTED: "REJECTED", // Booking ditolak
  CANCELLED: "CANCELLED", // Dibatalkan oleh Tenant
  COMPLETED: "COMPLETED", // Masa sewa telah selesai
} as const;

export type BookingStatusType = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];
