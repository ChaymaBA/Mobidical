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
export const GAME_ROUTES = {
  GET_ALL: "/games",
  GET_BY_USER: "/games/user/:userId",
  CREATE: "/games",
  UPDATE: "/games/:id",
  DELETE: "/games/:id"
};
