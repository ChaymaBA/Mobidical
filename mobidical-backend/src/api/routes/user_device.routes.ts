// src/routes/user_device.routes.ts

import { Router } from 'express';
import { UserDeviceController } from '@/api/controllers/user_device.controller';
import { USER_DEVICE_ROUTES } from '@/constants/routes.constants';
import { AuthMiddleware } from '@/api/middlewares/auth.middleware';
import { UserRole } from '@/types/enum.type';
import { ValidationMiddleware } from '../middlewares/validation.middleware';
import { UserDeviceCreateDto, UserDeviceUpdateDto } from '@/dtos/user_device.dto';

export default function (controllers: { userDeviceController: UserDeviceController }): Router {
  const router = Router();
  const { userDeviceController } = controllers;

  // Get all user devices route (admin only)
  router.get(
    USER_DEVICE_ROUTES.GET_ALL,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    userDeviceController.getAllUserDevices.bind(userDeviceController)
  );

  // Get user device by ID route
  router.get(
    USER_DEVICE_ROUTES.GET_BY_ID,
    AuthMiddleware.authenticate,
    userDeviceController.getUserDeviceById.bind(userDeviceController)
  );

  // Create user device route
  router.post(
    USER_DEVICE_ROUTES.CREATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(UserDeviceCreateDto),
    userDeviceController.createUserDevice.bind(userDeviceController)
  );

  // Update user device route
  router.put(
    USER_DEVICE_ROUTES.UPDATE,
    AuthMiddleware.authenticate,
    ValidationMiddleware.validate(UserDeviceUpdateDto),
    userDeviceController.updateUserDevice.bind(userDeviceController)
  );

  // Delete user device route (admin only)
  router.delete(
    USER_DEVICE_ROUTES.DELETE,
    AuthMiddleware.authenticate,
    AuthMiddleware.requireRole(UserRole.ADMIN),
    userDeviceController.deleteUserDevice.bind(userDeviceController)
  );

  return router;
}