import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Session } from "@/entities/Session";  // Vérifie l'importation correcte de "Session"
import { Children } from "@/entities/Children";  // Vérifie l'importation correcte de "Children"

@Entity("ai_recommendations")
export class AIRecommendation {
  @PrimaryGeneratedColumn("uuid")
  id!: string; // UUID comme identifiant primaire

  @ManyToOne(() => Session, (session) => session.aiRecommendations)
  session!: Session; // Relation avec l'entité "Session"

  @ManyToOne(() => Children, (child) => child.aiRecommendations)
  child!: Children; // Relation avec l'entité "Children"

  @Column({
    type: "enum",
    enum: ["activity", "difficulty", "approach"],
    nullable: false,
  })
  recommendation_type!: "activity" | "difficulty" | "approach"; // Type de recommandation

  @Column({
    type: "json",
    nullable: false,
  })
  recommendations!: any; // Recommandations au format JSON

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  reasoning!: string; // Raisonnement derrière la recommandation

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  created_at!: Date; // Timestamp de création
}
