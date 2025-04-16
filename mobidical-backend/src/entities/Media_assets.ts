import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Children } from "@/entities/Children";
import { User } from "@/entities/User";  // Assurez-vous d'importer l'entité User correctement

@Entity("media_assets")
export class MediaAsset {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  type!: string;

  @Column({
    type: "text",
    nullable: false,
  })
  url!: string;

  @ManyToOne(() => Children, (children) => children.mediaAssets)
  @JoinColumn({ name: "child_id" })
  child!: Children;

  @ManyToOne(() => User, (user) => user.mediaAssets)
  @JoinColumn({ name: "user_id" })
  user!: User;  // Ajout de la relation avec l'entité User

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  created_at!: Date;
}