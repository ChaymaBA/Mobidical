import { SessionRepository } from '@/repositories/session.repository';
import { z } from 'zod';
import { SessionCreateDto, SessionUpdateDto } from '@/dtos/session.dto';

export class SessionService {
  constructor(private sessionRepository: SessionRepository) {}

  async createSession(data: z.infer<typeof SessionCreateDto>, childId: number) {
    return await this.sessionRepository.create(data, childId);
  }

  async getAllSessions() {
    return await this.sessionRepository.findAll();
  }

  async getSessionById(id: number) {
    return await this.sessionRepository.findById(id);
  }

  async updateSession(id: number, data: z.infer<typeof SessionUpdateDto>) {
    return await this.sessionRepository.update(id, data);
  }

  async deleteSession(id: number) {
    return await this.sessionRepository.delete(id);
  }
}
