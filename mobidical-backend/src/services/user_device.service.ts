import { UserDeviceRepository } from '@/repositories/user_device.repository';
import { UserDeviceCreateDto, UserDeviceUpdateDto } from '@/dtos/user_device.dto';
import { z } from 'zod';

type UserDeviceCreateDtoType = z.infer<typeof UserDeviceCreateDto>;
type UserDeviceUpdateDtoType = z.infer<typeof UserDeviceUpdateDto>;

export class UserDeviceService {
  constructor(private userDeviceRepository: UserDeviceRepository) {}

  async getAllUserDevices() {
    return await this.userDeviceRepository.findAll();
  }

  async getUserDeviceById(id: number) {
    return await this.userDeviceRepository.findById(id);
  }

  async createUserDevice(deviceData: UserDeviceCreateDtoType, userId: number) {
    return await this.userDeviceRepository.create(deviceData, userId);
  }

  async updateUserDevice(id: number, deviceData: UserDeviceUpdateDtoType) {
    return await this.userDeviceRepository.update(id, deviceData);
  }

  async deleteUserDevice(id: number) {
    return await this.userDeviceRepository.delete(id);
  }
}
