// src/services/progress-report.service.ts
import { ProgressReport } from '@/entities/Progress_Report';
import { ProgressReportRepository } from '@/repositories/progress_report.repository';
import { ProgressReportCreateDto, ProgressReportUpdateDto } from '@/dtos/progress_report.dto';
import { UserRole } from '@/types/enum.type';

export class ProgressReportService {
  constructor(private progressReportRepository: ProgressReportRepository) {}

  async getAllProgressReports(): Promise<ProgressReport[]> {
    return await this.progressReportRepository.findAll();
  }

  async getProgressReportById(id: number): Promise<ProgressReport | null> {
    return await this.progressReportRepository.findById(id);
  }

  async getProgressReportsByChild(childId: number): Promise<ProgressReport[]> {
    return await this.progressReportRepository.findByChildId(childId);
  }

  async createProgressReport(data: ProgressReportCreateDto): Promise<ProgressReport> {
    return await this.progressReportRepository.create(data);
  }

  async updateProgressReport(id: number, data: ProgressReportUpdateDto): Promise<ProgressReport | null> {
    const report = await this.progressReportRepository.findById(id);
    if (!report) {
      return null;
    }

    return await this.progressReportRepository.update(id, data);
  }

  async deleteProgressReport(id: number): Promise<boolean> {
    return await this.progressReportRepository.delete(id);
  }

  isUserAuthorized(report: ProgressReport, userId: number, userRole: UserRole): boolean {
    if (userRole === UserRole.ADMIN) {
      return true;
    }
    return report.user.id === userId;
  }
}
