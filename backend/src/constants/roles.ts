// backend/src/constants/roles.ts

export const ROLES = {
  OWNER: "OWNER",
  OPERATOR: "OPERATOR",
  TENANT: "TENANT",
} as const;

export type RoleType = (typeof ROLES)[keyof typeof ROLES];
