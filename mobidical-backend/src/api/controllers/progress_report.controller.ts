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
      // Get child_id from the authenticated user (assumed that user has access to a specific child)
      const userId = req.user?.id;
      if (!userId) {
        res.status(400).json({ message: 'User is not authenticated' });
        return;
      }

      // Fetch child associated with the user
      const child = await this.childrenService.getChildrenByUser(userId);
      if (!child || child.length === 0) {
        res.status(404).json({ message: 'No associated child found for this user' });
        return;
      }

      const childId = child[0].id; // Assuming one child per user, modify if needed for multiple children

      // Create a complete request body by merging the childId from the user if not already in the body
      const completeRequestBody = {
        ...req.body,
        ...(req.body.child_id ? {} : { child_id: childId })  // Only add child_id if not already provided
      };

      // Now validate the complete request
      const validationResult = ProgressReportCreateDto.safeParse(completeRequestBody);
      if (!validationResult.success) {
        res.status(400).json({
          message: 'Validation failed',
          errors: validationResult.error.errors,
        });
        return;
      }

      const reportData = validationResult.data;
      
      // Verify the child exists (this check might be redundant, depending on your logic)
      if (!reportData.child_id) {
        res.status(400).json({ message: 'Child ID is required' });
        return;
      }
      const foundChild = await this.childrenService.getChildById(reportData.child_id);
      if (!foundChild) {
        res.status(404).json({ message: 'Child not found' });
        return;
      }

      // Build complete report data
      const completeReportData = {
        ...reportData,
        user_id: req.user?.id
      };

      const report = await this.progressReportService.createProgressReport(completeReportData);
      const responseData = transformProgressReportToResponse(report, req.user?.role as UserRole);

      res.status(201).json({
        message: 'Progress report created successfully',
        report: responseData,
      });
    } catch (error) {
      handleError(res, error);
    }
  }

  // Rest of the controller methods remain unchanged
  async getAllProgressReports(req: Request, res: Response): Promise<void> {
    try {
      if (req.user?.role === UserRole.ADMIN) {
        // Admin gets all reports
        const reports = await this.progressReportService.getAllProgressReports();
        const responseData = transformProgressReportToResponse(reports, UserRole.ADMIN);
        res.json(responseData);
      } else {
        // Regular user gets reports for their children only
        const children = await this.childrenService.getChildrenByUser(req.user!.id);
        const childIds = children.map(child => child.id);
        
        if (childIds.length === 0) {
          res.json([]);
          return;
        }
        
        const reports = [];
        for (const childId of childIds) {
          const childReports = await this.progressReportService.getProgressReportsByChild(childId);
          reports.push(...childReports);
        }
        const responseData = transformProgressReportToResponse(reports, UserRole.USER);
        res.json(responseData);
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

      const responseData = transformProgressReportToResponse(report, req.user?.role as UserRole);
      res.json(responseData);
    } catch (error) {
      handleError(res, error);
    }
  }

  async getProgressReportsByChild(req: Request, res: Response): Promise<void> {
    try {
      // Use child_id from the authenticated user
      const userId = req.user?.id;
      if (!userId) {
        res.status(400).json({ message: 'User is not authenticated' });
        return;
      }

      // Fetch child associated with the user
      const child = await this.childrenService.getChildrenByUser(userId);
      if (!child || child.length === 0) {
        res.status(404).json({ message: 'No associated child found for this user' });
        return;
      }

      const childId = child[0].id;

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

      await this.progressReportService.deleteProgressReport(reportId);
      res.json({ message: 'Progress report deleted successfully' });
    } catch (error) {
      handleError(res, error);
    }
  }
}
