// src/controllers/progress-report.controller.ts
import { Request, Response } from 'express';
import { ProgressReportService } from '@/services/progress_report.service';
import { ChildrenService } from '@/services/children.service';
import { handleError } from '@/core/errors/errorHandler';
import { 
  ProgressReportCreateDto, 
  ProgressReportUpdateDto, 
  transformProgressReportToResponse 
} from '@/dtos/progress_report.dto';
import { UserRole } from '@/types/enum.type';

export class ProgressReportController {
  constructor(
    private progressReportService: ProgressReportService,
    private childrenService: ChildrenService
  ) {}

  async createProgressReport(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = ProgressReportCreateDto.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          message: 'Validation failed',
          errors: validationResult.error.errors,
        });
        return;
      }

      const reportData = validationResult.data;
      
      // Vérifier si l'enfant existe et si l'utilisateur a le droit d'y accéder
      const child = await this.childrenService.getChildById(reportData.child_id);
      if (!child) {
        res.status(404).json({ message: 'Child not found' });
        return;
      }

      if (req.user?.role !== UserRole.ADMIN && child.user_id !== req.user?.id) {
        res.status(403).json({ 
          message: 'You can only create progress reports for your own children' 
        });
        return;
      }

      // Ajouter l'ID de l'utilisateur qui crée le rapport
      if (!reportData.user_id && req.user) {
        reportData.user_id = req.user.id;
      }

      const report = await this.progressReportService.createProgressReport(reportData);
      const responseData = transformProgressReportToResponse(report, req.user?.role as UserRole);

      res.status(201).json({
        message: 'Progress report created successfully',
        report: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async getAllProgressReports(req: Request, res: Response): Promise<void> {
    try {
      const reports = await this.progressReportService.getAllProgressReports();

      if (req.user?.role === UserRole.ADMIN) {
        const responseData = transformProgressReportToResponse(reports, UserRole.ADMIN);
        res.json(responseData);
      } else if (req.user) {
        // Filtre pour ne montrer que les rapports des enfants de l'utilisateur
        const children = await this.childrenService.getChildrenByUser(req.user.id);
        const childIds = children.map(child => child.id);
        
        const userReports = reports.filter(report => 
          childIds.includes(report.child_id)
        );
        
        const responseData = transformProgressReportToResponse(userReports, UserRole.USER);
        res.json(responseData);
      } else {
        res.status(403).json({ message: 'Unauthorized access' });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async getProgressReportById(req: Request, res: Response): Promise<void> {
    try {
      const reportId = parseInt(req.params.id);
      if (isNaN(reportId)) {
        res.status(400).json({ message: 'Invalid report ID' });
        return;
      }
      
      const report = await this.progressReportService.getProgressReportById(reportId);

      if (!report) {
        res.status(404).json({ message: 'Progress report not found' });
        return;
      }

      // Vérifier l'autorisation d'accès au rapport
      if (req.user?.role === UserRole.ADMIN) {
        const responseData = transformProgressReportToResponse(report, UserRole.ADMIN);
        res.json(responseData);
      } else if (req.user) {
        // Vérifier si l'utilisateur est parent de l'enfant concerné
        const child = await this.childrenService.getChildById(report.child_id);
        
        if (child && child.user_id === req.user.id) {
          const responseData = transformProgressReportToResponse(report, UserRole.USER);
          res.json(responseData);
        } else {
          res.status(403).json({ 
            message: 'You are not authorized to view this progress report' 
          });
        }
      } else {
        res.status(403).json({ message: 'Unauthorized access' });
      }
    } catch (error) {
      handleError(res, error);
    }
  }

  async getProgressReportsByChild(req: Request, res: Response): Promise<void> {
    try {
      const childId = parseInt(req.params.childId);
      if (isNaN(childId)) {
        res.status(400).json({ message: 'Invalid child ID' });
        return;
      }

      // Vérifier si l'enfant existe et si l'utilisateur a le droit d'y accéder
      const child = await this.childrenService.getChildById(childId);
      if (!child) {
        res.status(404).json({ message: 'Child not found' });
        return;
      }

      if (req.user?.role !== UserRole.ADMIN && child.user_id !== req.user?.id) {
        res.status(403).json({ 
          message: 'You can only view progress reports for your own children' 
        });
        return;
      }

      const reports = await this.progressReportService.getProgressReportsByChild(childId);
      const responseData = transformProgressReportToResponse(reports, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async updateProgressReport(req: Request, res: Response): Promise<void> {
    try {
      const validationResult = ProgressReportUpdateDto.safeParse(req.body);
      if (!validationResult.success) {
        res.status(400).json({
          message: 'Validation failed',
          errors: validationResult.error.errors,
        });
        return;
      }

      const updateData = validationResult.data;
      const reportId = parseInt(req.params.id);
      if (isNaN(reportId)) {
        res.status(400).json({ message: 'Invalid report ID' });
        return;
      }

      const existingReport = await this.progressReportService.getProgressReportById(reportId);
      if (!existingReport) {
        res.status(404).json({ message: 'Progress report not found' });
        return;
      }

      // Vérifier si l'utilisateur a le droit de modifier ce rapport
      if (req.user?.role !== UserRole.ADMIN) {
        const child = await this.childrenService.getChildById(existingReport.child_id);
        
        if (!child || child.user_id !== req.user?.id) {
          res.status(403).json({ 
            message: 'You can only update progress reports for your own children' 
          });
          return;
        }
      }

      const updatedReport = await this.progressReportService.updateProgressReport(reportId, updateData);
      const responseData = transformProgressReportToResponse(updatedReport, req.user?.role as UserRole);

      res.json({
        message: 'Progress report updated successfully',
        report: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  async deleteProgressReport(req: Request, res: Response): Promise<void> {
    try {
      const reportId = parseInt(req.params.id);
      if (isNaN(reportId)) {
        res.status(400).json({ message: 'Invalid report ID' });
        return;
      }

      const existingReport = await this.progressReportService.getProgressReportById(reportId);
      if (!existingReport) {
        res.status(404).json({ message: 'Progress report not found' });
        return;
      }

      // Vérifier si l'utilisateur a le droit de supprimer ce rapport
      if (req.user?.role !== UserRole.ADMIN) {
        const child = await this.childrenService.getChildById(existingReport.child_id);
        
        if (!child || child.user_id !== req.user?.id) {
          res.status(403).json({ 
            message: 'You can only delete progress reports for your own children' 
          });
          return;
        }
      }

      await this.progressReportService.deleteProgressReport(reportId);

      res.json({ message: 'Progress report deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
}