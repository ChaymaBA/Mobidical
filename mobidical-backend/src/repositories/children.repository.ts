import { Repository, DataSource } from 'typeorm';
import { Children } from '@/entities/Children';
import { User } from '@/entities/User';
import { ChildrenCreateDto, ChildrenUpdateDto } from '@/dtos/children.dto';

export class ChildrenRepository {
  private childrenRepository: Repository<Children>;
  private userRepository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.childrenRepository = this.dataSource.getRepository(Children);
    this.userRepository = this.dataSource.getRepository(User);
  }

  async findAll(): Promise<Children[]> {
    return await this.childrenRepository.find({
      relations: ['User']
    });
  }

  async findById(id: number): Promise<Children | null> {
    return await this.childrenRepository.findOne({
      where: { id },
      relations: ['User']
    });
  }

  async findByUserId(userId: number): Promise<Children[]> {
    return await this.childrenRepository.find({
      where: { user_id: userId }, // Searching by user_id directly
      relations: ['User']
    });
  }

  async create(childData: ChildrenCreateDto, userId: number): Promise<Children> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const child = this.childrenRepository.create({
      user_id: userId, // Now taking userId from the token
      first_name: childData.first_name,
      last_name: childData.last_name,
      birth_date: childData.birth_date,
      gender: childData.gender,
      diagnosis_details: childData.diagnosis_details,
    });

    return await this.childrenRepository.save(child);
  }

  async update(id: number, childData: ChildrenUpdateDto): Promise<Children | null> {
    const child = await this.childrenRepository.findOneBy({ id });
    if (!child) {
      return null;
    }

    Object.assign(child, childData);

    return await this.childrenRepository.save(child);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.childrenRepository.delete({ id });
    return result.affected ? result.affected > 0 : false;
  }
}
