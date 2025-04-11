import { Column, Entity, PrimaryGeneratedColumn,OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Children } from './Children'; 
import { Exercice } from './Exercice'; 
import { User } from './User'; 
import { Reward } from './Reward';

@Entity("progress_reports")
export class ProgressReport {
  @PrimaryGeneratedColumn()
  id!: number; 

  @Column({ type: "int" })
  child_id!: number; 

  @Column({ type: "date" })
  report_period_start!: Date;

  @Column({ type: "date" })
  report_period_end!: Date; 

  @Column({ type: "json", nullable: true })
  cognitive_metrics?: any;

  @Column({ type: "json", nullable: true })
  social_metrics?: any; 

  @Column({ type: "json", nullable: true })
  motor_metrics?: any; 

  @Column({ type: "json", nullable: true })
  communication_metrics?: any; 

  @Column({ type: "varchar", length: 500 })
  observations!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  generated_at!: Date; 

  @ManyToOne(() => Children, (children) => children.progressReports)
  
  @JoinColumn({ name: "child_id" })
  child!: Children; 

  @OneToMany(() => Exercice, (exercice) => exercice.progressReport)
  exercices!: Exercice[];

  @ManyToOne(() => Reward, (reward) => reward.progressReport)
  reward!: Reward;

  @ManyToOne(() => User, (user) => user.progressReports)
  user!: User;
}
