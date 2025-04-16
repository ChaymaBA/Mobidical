import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Session } from "@/entities/Session";  
import { Children } from "@/entities/Children";  
import { RecommendationType } from "@/types/enum.type";
@Entity("ai_recommendations")
export class AIRecommendation {
  @PrimaryGeneratedColumn()
  id!: number; 

  @ManyToOne(() => Session, (session) => session.aiRecommendations)
  session!: Session; 

  @ManyToOne(() => Children, (child) => child.aiRecommendations)
  child!: Children; 

  @Column({
    type: "enum",
    enum: RecommendationType,
    nullable: false,
  })
  recommendation_type!:RecommendationType; 

  @Column({
    type: "json",
    nullable: false,
  })
  recommendations!: any; 

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  reasoning!: string; 

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  created_at!: Date;
}
