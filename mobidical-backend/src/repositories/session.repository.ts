import { DataSource, Repository } from 'typeorm';
import { Session } from '@/entities/Session';
import { Children } from '@/entities/Children';
import { z } from 'zod';
import { SessionCreateDto, SessionUpdateDto } from '@/dtos/session.dto';

type CreateDtoType = z.infer<typeof SessionCreateDto>;
type UpdateDtoType = z.infer<typeof SessionUpdateDto>;

export class SessionRepository {
  private sessionRepository: Repository<Session>;
  private childrenRepository: Repository<Children>;

  constructor(private dataSource: DataSource) {
    this.sessionRepository = this.dataSource.getRepository(Session);
    this.childrenRepository = this.dataSource.getRepository(Children);
  }

  async create(data: CreateDtoType, childId: number): Promise<Session> {
    const child = await this.childrenRepository.findOneBy({ id: childId });
    if (!child) throw new Error('Child not found');

    const session = this.sessionRepository.create({
      ...data,
      child,
    });

    return await this.sessionRepository.save(session);
  }

  async findAll(): Promise<Session[]> {
    return await this.sessionRepository.find({ relations: ['child', 'aiRecommendations'] });
  }

  async findById(id: number): Promise<Session | null> {
    return await this.sessionRepository.findOne({ where: { id }, relations: ['child', 'aiRecommendations'] });
  }

  async update(id: number, data: UpdateDtoType): Promise<Session | null> {
    const session = await this.sessionRepository.findOneBy({ id });
    if (!session) return null;

    Object.assign(session, data);
    return await this.sessionRepository.save(session);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.sessionRepository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
}
