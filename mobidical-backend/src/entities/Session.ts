import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Children } from "./Children"; // Importation de l'entité Children
import { AIRecommendation } from "./Ai_recommendation"; // Importation de l'entité AIRecommendation

@Entity("sessions")
export class Session {
  @PrimaryGeneratedColumn()
  id!: number; // Utilisation de UUID pour l'id

  @ManyToOne(() => Children, (child) => child.sessions) // Relation ManyToOne avec l'entité Children
  child!: Children;

  @Column({ type: "timestamp", nullable: false })
  started_at!: Date;

  @Column({ type: "timestamp", nullable: false })
  ended_at!: Date;

  @Column({ type: "json", nullable: true })
  device_info!: { [key: string]: any }; // Détails du dispositif (peut être un objet JSON)

  @Column({ type: "text", nullable: true })
  notes!: string; // Notes supplémentaires pour la session

  @OneToMany(() => AIRecommendation, (aiRecommendation) => aiRecommendation.session) // Relation OneToMany avec AIRecommendation
  aiRecommendations!: AIRecommendation[]; // Une session peut avoir plusieurs recommandations d'IA
}
