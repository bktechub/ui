export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  NGO_PROFILE: '/ngo/profile',
  WORK_PLAN: '/ngo/work-plan',
  REPORTS: '/ngo/reports',
  ADMIN: '/admin',
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];