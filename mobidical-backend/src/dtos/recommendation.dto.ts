// src/dtos/recommendation.dto.ts
import { IsArray, IsBoolean, IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateRecommendationDto {
  @IsString()
  preferred_colors?: string;

  @IsEnum(['low', 'medium', 'high'])
  audio_sensitivity: 'low' | 'medium' | 'high' = 'medium';

  @IsBoolean()
  prefers_animations: boolean = false;

  @IsInt()
  @Min(1)
  @Max(5)
  visual_complexity: number = 2;

  @IsString()
  favorite_activities?: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Max(10)
  num_recommendations?: number = 3;
}