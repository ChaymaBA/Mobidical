import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11744889425990 implements MigrationInterface {
    name = 'Migration11744889425990'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "media_assets" DROP CONSTRAINT "FK_a26265b38b17e763b5d1e07f4db"`);
        await queryRunner.query(`ALTER TABLE "media_assets" DROP COLUMN "childId"`);
        await queryRunner.query(`ALTER TABLE "media_assets" ADD "child_id" integer`);
        await queryRunner.query(`ALTER TABLE "media_assets" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "media_assets" DROP CONSTRAINT "PK_ca47e9f67a5e5d8af1e75d66ee6"`);
        await queryRunner.query(`ALTER TABLE "media_assets" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "media_assets" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "media_assets" ADD CONSTRAINT "PK_ca47e9f67a5e5d8af1e75d66ee6" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" DROP CONSTRAINT "FK_928f0c3a77755c7372015e775d5"`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" DROP CONSTRAINT "PK_57aa33b4356a91e94e98bcd3f2d"`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" ADD CONSTRAINT "PK_57aa33b4356a91e94e98bcd3f2d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" DROP COLUMN "sessionId"`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" ADD "sessionId" integer`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "PK_3238ef96f18b355b671619111bc"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" DROP CONSTRAINT "PK_451d1834b231f17090431841965"`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" ADD CONSTRAINT "PK_451d1834b231f17090431841965" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "media_assets" ADD CONSTRAINT "FK_c826f63f38cee48d0380f44bc09" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media_assets" ADD CONSTRAINT "FK_fc5a37951b9c3e1dfcaf7a6c83c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" ADD CONSTRAINT "FK_928f0c3a77755c7372015e775d5" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ai_recommendations" DROP CONSTRAINT "FK_928f0c3a77755c7372015e775d5"`);
        await queryRunner.query(`ALTER TABLE "media_assets" DROP CONSTRAINT "FK_fc5a37951b9c3e1dfcaf7a6c83c"`);
        await queryRunner.query(`ALTER TABLE "media_assets" DROP CONSTRAINT "FK_c826f63f38cee48d0380f44bc09"`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" DROP CONSTRAINT "PK_451d1834b231f17090431841965"`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" ADD CONSTRAINT "PK_451d1834b231f17090431841965" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "PK_3238ef96f18b355b671619111bc"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" DROP COLUMN "sessionId"`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" ADD "sessionId" uuid`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" DROP CONSTRAINT "PK_57aa33b4356a91e94e98bcd3f2d"`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" ADD CONSTRAINT "PK_57aa33b4356a91e94e98bcd3f2d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" ADD CONSTRAINT "FK_928f0c3a77755c7372015e775d5" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media_assets" DROP CONSTRAINT "PK_ca47e9f67a5e5d8af1e75d66ee6"`);
        await queryRunner.query(`ALTER TABLE "media_assets" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "media_assets" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "media_assets" ADD CONSTRAINT "PK_ca47e9f67a5e5d8af1e75d66ee6" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "media_assets" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "media_assets" DROP COLUMN "child_id"`);
        await queryRunner.query(`ALTER TABLE "media_assets" ADD "childId" integer`);
        await queryRunner.query(`ALTER TABLE "media_assets" ADD CONSTRAINT "FK_a26265b38b17e763b5d1e07f4db" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
