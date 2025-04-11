import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Children } from "@/entities/Children";  // Assurez-vous que l'importation de "Children" est correcte

@Entity("media_assets")
export class MediaAsset {
  @PrimaryGeneratedColumn("uuid")
  id!: string; // UUID comme identifiant primaire

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
  })
  type!: string; // Type de média (par exemple "image", "video", etc.)

  @Column({
    type: "text",
    nullable: false,
  })
  url!: string; // URL où le média est stocké

  @ManyToOne(() => Children, (children) => children.mediaAssets)
  child!: Children; // Relation ManyToOne avec l'entité "Children" (enfant auquel appartient le média)

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    nullable: false,
  })
  created_at!: Date; // Timestamp de la création du média
}
