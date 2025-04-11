// src/repositories/progress-report.repository.ts
import { Repository, Between } from 'typeorm';
import { AppDataSource } from '@/core/configuration/data-source';
import { ProgressReport } from '@/entities/Progress_Report';
import { ProgressReportCreateDto, ProgressReportUpdateDto } from '@/dtos/progress_report.dto';

export class ProgressReportRepository {
  private repository: Repository<ProgressReport>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProgressReport);
  }

  async findAll(): Promise<ProgressReport[]> {
    return await this.repository.find({
      relations: ['child', 'user', 'reward']
    });
  }

  async findById(id: number): Promise<ProgressReport | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['child', 'user', 'reward']
    });
  }

  async findByChildId(childId: number): Promise<ProgressReport[]> {
    return await this.repository.find({
      where: { child_id: childId },
      relations: ['child', 'user', 'reward'],
      order: { report_period_end: 'DESC' }
    });
  }

  async findByUserId(userId: number): Promise<ProgressReport[]> {
    return await this.repository.find({
      where: { user: { id: userId } },
      relations: ['child', 'user', 'reward']
    });
  }

  async findByPeriod(startDate: Date, endDate: Date): Promise<ProgressReport[]> {
    return await this.repository.find({
      where: [
        { report_period_start: startDate, report_period_end: endDate },
        { report_period_start: Between(startDate, endDate) },
        { report_period_end: Between(startDate, endDate) }
      ],
      relations: ['child', 'user', 'reward']
    });
  }

  async create(data: ProgressReportCreateDto): Promise<ProgressReport> {
    const newReport = this.repository.create(data);
    return await this.repository.save(newReport);
  }

  async update(id: number, data: ProgressReportUpdateDto): Promise<ProgressReport> {
    const report = await this.findById(id);
    if (!report) {
      throw new Error(`Progress report with ID ${id} not found`);
    }

    Object.assign(report, data);
    return await this.repository.save(report);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
