// backend/src/constants/report-status.ts

export const REPORT_STATUS = {
  OPEN: "OPEN", // Laporan keluhan baru masuk
  IN_PROGRESS: "IN_PROGRESS", // Sedang dalam perbaikan/pengecekan
  RESOLVED: "RESOLVED", // Masalah sudah selesai ditangani
} as const;

export type ReportStatusType = (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS];
