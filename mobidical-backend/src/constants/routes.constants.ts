// constants/routes.constants.ts

export const AUTH_ROUTES = {
  REGISTER: '/register',
  LOGIN: '/login',
  REFRESH_TOKEN: '/refresh-token',
  PROFILE: '/profile',
  UPDATE_PROFILE: '/profile',
  DELETE_PROFILE: '/profile',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password'
};
export const EXERCICE_ROUTES = {
  GET_ALL: "/exercices",
  GET_BY_USER: "/exercices/user/:userId",
  CREATE: "/exercices",
  UPDATE: "/exercices/:id",
  DELETE: "/exercices/:id"
};
