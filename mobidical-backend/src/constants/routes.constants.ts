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

export const FEEDBACK_ROUTES = {
  GET_ALL: '/',
  GET_BY_ID: '/:id',
  GET_BY_USER: '/user/:userId',
  CREATE: '/',
  UPDATE: '/:id',
  DELETE: '/:id'
};

export const CHILDREN_ROUTES = {
  GET_ALL: '/',
  GET_BY_ID: '/:id',
  GET_BY_USER: '/user/:userId',
  CREATE: '/',
  UPDATE: '/:id',
  DELETE: '/:id'
};

export const PROGRESS_REPORT_ROUTES = {
  GET_ALL: '/',
  GET_BY_ID: '/:id',
  GET_BY_CHILD: '/child/:childId',
  CREATE: '/',
  UPDATE: '/:id',
  DELETE: '/:id',
};

// src/constants/routes.constants.ts
// (Ajoutez ceci à votre fichier de constantes de routes existant)

export const PREFERENCE_ROUTES = {
  GET_ALL: '/',
  GET_BY_ID: '/:id',
  GET_BY_CHILD: '/child/:childId',
  GET_BY_USER: '/user/:userId',
  CREATE: '/',
  UPDATE: '/:id',
  DELETE: '/:id'
};