// backend/src/constants/permissions.ts

export const PERMISSIONS = {
  // Property
  PROPERTY_CREATE: "property:create",
  PROPERTY_READ: "property:read",
  PROPERTY_UPDATE: "property:update",
  PROPERTY_DELETE: "property:delete",

  // Room
  ROOM_CREATE: "room:create",
  ROOM_READ: "room:read",
  ROOM_UPDATE: "room:update",
  ROOM_DELETE: "room:delete",

  // Booking
  BOOKING_CREATE: "booking:create",
  BOOKING_READ_OWN: "booking:read:own",
  BOOKING_READ_ALL: "booking:read:all",
  BOOKING_UPDATE_STATUS: "booking:update:status",

  // Payment
  PAYMENT_CREATE: "payment:create",
  PAYMENT_READ_OWN: "payment:read:own",
  PAYMENT_READ_ALL: "payment:read:all",
  PAYMENT_VERIFY: "payment:verify",

  // Report
  REPORT_CREATE: "report:create",
  REPORT_READ_OWN: "report:read:own",
  REPORT_READ_ALL: "report:read:all",
  REPORT_UPDATE_STATUS: "report:update:status",

  // User
  USER_READ: "user:read",
  USER_UPDATE: "user:update",
  USER_DELETE: "user:delete",
} as const;

export type PermissionType = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
