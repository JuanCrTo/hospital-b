export const USER_ROLES = ['doctor', 'nurse', 'patient'] as const;
export type UserRole = typeof USER_ROLES[number];
