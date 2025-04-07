import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Children } from './Children'; 
import { AudioSensitivity } from '@/types/enum.type';
@Entity("preferences")
export class Preference {
  @PrimaryGeneratedColumn("uuid")
  id!: string; 

  @Column({ type: "uuid" })
  child_id!: string; 

  @Column({ type: "varchar", length: 255 })
  preferred_colors!: string;

  @Column({ type: "enum",
   enum: AudioSensitivity })
  audio_sensitivity!: AudioSensitivity; 

  @Column({ type: "boolean", default: false })
  prefers_animations!: boolean; 

  @Column({ type: "int", nullable: false })
  visual_complexity!: number; 

  @Column({ type: "json", nullable: true })
  favorite_activities?: any; 

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at!: Date; 
  @ManyToOne(() => Children, (children) => children.preferences)
  @JoinColumn({ name: "child_id" })
  child!: Children; 
}
