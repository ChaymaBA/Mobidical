import { z } from 'zod';
import { Children } from '@/entities/Children';
import { UserRole } from '@/types/enum.type';

// Schéma de validation pour la création d'un enfant
export const ChildrenCreateDto = z.object({
  user_id: z.number(),
  first_name: z.string().min(1).max(100),
  last_name: z.string().min(1).max(100),
  birth_date: z.coerce.date(),
  gender: z.string().max(10),
  diagnosis_details: z.any().optional(),
  
});

// Type pour la création d'un enfant
export type ChildrenCreateDto = z.infer<typeof ChildrenCreateDto>;

// Schéma de validation pour la mise à jour d'un enfant
export const ChildrenUpdateDto = z.object({
  first_name: z.string().min(1).max(100).optional(),
  last_name: z.string().min(1).max(100).optional(),
  birth_date: z.coerce.date().optional(),
  gender: z.string().max(10).optional(),
  diagnosis_details: z.any().optional(),
 
});

// Type pour la mise à jour d'un enfant
export type ChildrenUpdateDto = z.infer<typeof ChildrenUpdateDto>;

// Type pour la réponse
export type ChildrenResponseDto = {
  id: number;
  user_id?: number;
  first_name: string;
  last_name: string;
  birth_date: Date;
  gender: string;
  diagnosis_details?: any;
  
  created_at?: Date;
  updated_at?: Date;
};

/**
 * Transforme un objet Children en objet DTO de réponse
 */
export function transformSingleChildToResponse(child: Children | null | undefined, role: UserRole): ChildrenResponseDto | null {
  if (!child) {
    return null;
  }

  // Vérifier que l'enfant possède un ID
  if (child.id === undefined) {
    throw new Error('Child entity is missing required id property');
  }

  // Utiliser la fonction generateChildrenResponseDto pour prendre en compte le rôle
  return generateChildrenResponseDto(child, role);
}

/**
 * Génère une réponse DTO pour un enfant en fonction du rôle utilisateur
 */
export function generateChildrenResponseDto(child: Children, userRole: UserRole): ChildrenResponseDto {
  if (userRole === UserRole.ADMIN) {
    // Version complète pour les administrateurs
    return {
      id: child.id,
      user_id: child.user_id,
      first_name: child.first_name,
      last_name: child.last_name,
      birth_date: child.birth_date,
      gender: child.gender,
      diagnosis_details: child.diagnosis_details,
    
      created_at: child.created_at,
      updated_at: child.updated_at
    };
  } else {
    // Version limitée pour les utilisateurs standard
    return {
      id: child.id,
      first_name: child.first_name,
      last_name: child.last_name,
      birth_date: child.birth_date,
      gender: child.gender,
    
    };
  }
}

/**
 * Fonction polyvalente qui peut transformer soit un seul enfant, 
 * soit un tableau d'enfants en fonction du type d'entrée
 */
export function transformChildrenToResponse(
  data: Children | Children[] | null | undefined, 
  role: UserRole
): ChildrenResponseDto | ChildrenResponseDto[] | null {
  // Si les données sont null ou undefined
  if (!data) {
    return null;
  }

  // Si c'est un tableau d'enfants
  if (Array.isArray(data)) {
    return data
      .filter(child => child !== null && child !== undefined)
      .map(child => transformSingleChildToResponse(child, role))
      .filter((dto): dto is ChildrenResponseDto => dto !== null);
  }

  // Si c'est un seul enfant
  return transformSingleChildToResponse(data, role);
}

/**
 * Fonction dédiée pour transformer un tableau d'enfants
 * @deprecated Utilisez transformChildrenToResponse à la place
 */
export function transformChildrenListToResponse(
  children: Children[], 
  role: UserRole
): ChildrenResponseDto[] {
  return children
    .filter(child => child !== null && child !== undefined)
    .map(child => transformSingleChildToResponse(child, role))
    .filter((dto): dto is ChildrenResponseDto => dto !== null);
}