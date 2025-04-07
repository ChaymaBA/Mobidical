import { Column, Entity, PrimaryGeneratedColumn,OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User'; 
import { ProgressReport } from './Progress_Report'; 
import { Preference } from './Preferences'; 
import { MediaAsset } from './Media_assets';
import { Session } from './Session';
import { AIRecommendation } from './Ai_recommendation';
import { Exercice } from './Exercice';
import { ExerciseAssignment } from './Exercise_assignment';
@Entity("children")
export class Children {
  @PrimaryGeneratedColumn("uuid")
  id!: string; 

  @Column({ type: "uuid" })
  parent_id!: string; 

  @Column({ type: "varchar", length: 100 })
  first_name!: string;

  @Column({ type: "varchar", length: 100 })
  last_name!: string;

  @Column({ type: "date" })
  birth_date!: Date;

  @Column({ type: "varchar", length: 10 })
  gender!: string;

  @Column({ type: "json", nullable: true })
  diagnosis_details?: any; 

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at!: Date;

  @Column({ type: "int", nullable: true }) // Durée en minutes (ou autre unité)
  duration?: number;

  @ManyToOne(() => User, (user) => user.children)
  @JoinColumn({ name: "parent_id" })
  parent!: User; 

  @OneToMany(() => ProgressReport, (progressReport) => progressReport.child)
  progressReports!: ProgressReport[];

  @OneToMany(() => Preference, (preference) => preference.child)
  preferences!: Preference[];

  @OneToMany(() => MediaAsset, (mediaAsset) => mediaAsset.child)
  mediaAssets!: MediaAsset[];

  @OneToMany(() => Session, (session) => session.child) // Relation OneToMany avec Session
  sessions!: Session[]; 

  @OneToMany(() => AIRecommendation, (aiRecommendation) => aiRecommendation.child)
  aiRecommendations!: AIRecommendation[];

  @OneToMany(() => Exercice, (exercice) => exercice.child)
  exercices!: Exercice[];

  @OneToMany(() => ExerciseAssignment, (exerciseAssignment) => exerciseAssignment.child)
  exerciseAssignments!: ExerciseAssignment[];
}
