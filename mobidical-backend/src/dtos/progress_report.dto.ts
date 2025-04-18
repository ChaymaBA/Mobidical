// src/dtos/progress-report.dto.ts
import { z } from 'zod';
import { ProgressReport } from '@/entities/Progress_Report';
import { UserRole } from '@/types/enum.type';

// Schéma de validation pour la création d'un rapport de progrès
export const ProgressReportCreateDto = z.object({
  child_id: z.number().optional(),
  report_period_start: z.coerce.date(),
  report_period_end: z.coerce.date(),
  cognitive_metrics: z.any().optional(),
  social_metrics: z.any().optional(),
  motor_metrics: z.any().optional(),
  communication_metrics: z.any().optional(),
  observations: z.string().max(500),
});

// Type pour la création d'un rapport de progrès
export type ProgressReportCreateDto = z.infer<typeof ProgressReportCreateDto>;

// Schéma de validation pour la mise à jour d'un rapport de progrès
export const ProgressReportUpdateDto = z.object({
  report_period_start: z.coerce.date().optional(),
  report_period_end: z.coerce.date().optional(),
  cognitive_metrics: z.any().optional(),
  social_metrics: z.any().optional(),
  motor_metrics: z.any().optional(),
  communication_metrics: z.any().optional(),
  observations: z.string().max(500).optional(),
});

// Type pour la mise à jour d'un rapport de progrès
export type ProgressReportUpdateDto = z.infer<typeof ProgressReportUpdateDto>;

// Type de réponse pour les administrateurs (contient toutes les informations)
export type ProgressReportAdminResponseDto = {
  id: number;
  child_id: number;
  report_period_start: Date;
  report_period_end: Date;
  cognitive_metrics?: any;
  social_metrics?: any;
  motor_metrics?: any;
  communication_metrics?: any;
  observations: string;
  generated_at: Date;
  user_id?: number;
  reward_id?: number;
  child?: {
    id: number;
    first_name: string;
    last_name: string;
  };
};

// Type de réponse pour les utilisateurs standard (informations limitées)
export type ProgressReportUserResponseDto = {
  id: number;
  child_id: number;
  report_period_start: Date;
  report_period_end: Date;
  observations: string;
  generated_at: Date;
  child?: {
    id: number;
    first_name: string;
    last_name: string;
  };
};

// Type union pour la réponse (peut être l'un ou l'autre selon le rôle)
export type ProgressReportResponseDto = ProgressReportAdminResponseDto | ProgressReportUserResponseDto;

/**
 * Transforme un objet ProgressReport en objet DTO de réponse basé sur le rôle utilisateur
 */
export const transformSingleProgressReportToResponse = (
  report: ProgressReport | null | undefined, 
  userRole: UserRole
): ProgressReportResponseDto | null => {
  if (!report) {
    return null;
  }

  // Vérifier que le rapport possède un ID
  if (report.id === undefined) {
    throw new Error('Progress report is missing required id property');
  }

  // Créer un objet enfant simplifié si disponible
  const childData = report.child ? {
    id: report.child.id,
    first_name: report.child.first_name,
    last_name: report.child.last_name
  } : undefined;

  // Réponse différente selon le rôle
  if (userRole === UserRole.ADMIN) {
    // Version complète pour les administrateurs
    return {
      id: report.id,
      child_id: report.child_id,
      report_period_start: report.report_period_start,
      report_period_end: report.report_period_end,
      cognitive_metrics: report.cognitive_metrics,
      social_metrics: report.social_metrics,
      motor_metrics: report.motor_metrics,
      communication_metrics: report.communication_metrics,
      observations: report.observations,
      generated_at: report.generated_at,
      user_id: report.user?.id,
      reward_id: report.reward?.Id,
      child: childData
    };
  } else {
    // Version limitée pour les utilisateurs standard
    return {
      id: report.id,
      child_id: report.child_id,
      report_period_start: report.report_period_start,
      report_period_end: report.report_period_end,
      observations: report.observations,
      generated_at: report.generated_at,
      child: childData
    };
  }
};

/**
 * Fonction polyvalente qui peut transformer soit un seul rapport, 
 * soit un tableau de rapports en fonction du type d'entrée
 */
export const transformProgressReportToResponse = (
  data: ProgressReport | ProgressReport[] | null | undefined, 
  userRole: UserRole
): ProgressReportResponseDto | ProgressReportResponseDto[] | null => {
  // Si les données sont null ou undefined
  if (!data) {
    return null;
  }

  // Si c'est un tableau de rapports
  if (Array.isArray(data)) {
    return data
      .filter(report => report !== null && report !== undefined)
      .map(report => transformSingleProgressReportToResponse(report, userRole))
      .filter((dto): dto is ProgressReportResponseDto => dto !== null);
  }

  // Si c'est un seul rapport
  return transformSingleProgressReportToResponse(data, userRole);
};