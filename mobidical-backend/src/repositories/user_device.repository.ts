import { Repository, DataSource } from 'typeorm';
import { UserDevice } from '@/entities';
import { UserDeviceCreateDto, UserDeviceUpdateDto } from '@/dtos/user_device.dto';
import { User } from '@/entities';
import { z } from 'zod';

type UserDeviceCreateDtoType = z.infer<typeof UserDeviceCreateDto>;
type UserDeviceUpdateDtoType = z.infer<typeof UserDeviceUpdateDto>;

export class UserDeviceRepository {
  private userDeviceRepository: Repository<UserDevice>;
  private userRepository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.userDeviceRepository = this.dataSource.getRepository(UserDevice);
    this.userRepository = this.dataSource.getRepository(User);
  }

  async findAll(): Promise<UserDevice[]> {
    return await this.userDeviceRepository.find({
      relations: ['user']
    });
  }

  async findById(id: number): Promise<UserDevice | null> {
    return await this.userDeviceRepository.findOne({
      where: { id },
      relations: ['user']
    });
  }

  async create(deviceData: UserDeviceCreateDtoType, userId: number): Promise<UserDevice> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const userDevice = new UserDevice();
    userDevice.device_token = deviceData.device_token ?? '';
    userDevice.device_type = deviceData.device_type;
    userDevice.is_active = deviceData.is_active ?? true;

    if (deviceData.last_used_at) {
      userDevice.last_used_at = deviceData.last_used_at;
    }

    userDevice.user = user;

    return await this.userDeviceRepository.save(userDevice);
  }

  async update(id: number, deviceData: UserDeviceUpdateDtoType): Promise<UserDevice | null> {
    const userDevice = await this.userDeviceRepository.findOneBy({ id });
    if (!userDevice) return null;

    if (deviceData.device_token !== undefined) {
      userDevice.device_token = deviceData.device_token;
    }

    if (deviceData.device_type !== undefined) {
      userDevice.device_type = deviceData.device_type;
    }

    if (deviceData.is_active !== undefined) {
      userDevice.is_active = deviceData.is_active;
    }

    if (deviceData.last_used_at !== undefined) {
      userDevice.last_used_at = deviceData.last_used_at;
    }

    return await this.userDeviceRepository.save(userDevice);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userDeviceRepository.delete({ id });
    return result.affected ? result.affected > 0 : false;
  }
}
