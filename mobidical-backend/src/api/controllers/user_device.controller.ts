import { Request, Response } from 'express';
import { UserDeviceService } from '@/services/user_device.service';
import { handleError } from '@/core/errors/errorHandler';

export class UserDeviceController {
  constructor(private userDeviceService: UserDeviceService) {}

  async createUserDevice(req: Request, res: Response): Promise<void> {
    try {
      const deviceData = req.body;
      if (!req.user || !req.user.id) {
        res.status(400).json({ message: 'User information is missing from the request' });
        return;
      }
      const userId = req.user.id; 
      
      const device = await this.userDeviceService.createUserDevice(deviceData, userId);

      res.status(201).json({
        message: 'User device created successfully',
        device
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAllUserDevices(req: Request, res: Response): Promise<void> {
    try {
      const devices = await this.userDeviceService.getAllUserDevices();
      res.json(devices);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getUserDeviceById(req: Request, res: Response): Promise<void> {
    try {
      const deviceId = parseInt(req.params.id);
      const device = await this.userDeviceService.getUserDeviceById(deviceId);

      if (!device) {
        res.status(404).json({ message: 'User device not found' });
        return;
      }

      res.json(device);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateUserDevice(req: Request, res: Response): Promise<void> {
    try {
      const updateData = req.body;
      const deviceId = parseInt(req.params.id);
      const updatedDevice = await this.userDeviceService.updateUserDevice(deviceId, updateData);

      if (!updatedDevice) {
        res.status(404).json({ message: 'User device not found' });
        return;
      }

      res.json({
        message: 'User device updated successfully',
        device: updatedDevice
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteUserDevice(req: Request, res: Response): Promise<void> {
    try {
      const deviceId = parseInt(req.params.id);
      const isDeleted = await this.userDeviceService.deleteUserDevice(deviceId);

      if (!isDeleted) {
        res.status(404).json({ message: 'User device not found' });
        return;
      }

      res.json({ message: 'User device deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
}
