import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11744321837560 implements MigrationInterface {
    name = 'Migration11744321837560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "children" DROP CONSTRAINT "FK_e7f4185179e59c184d4ad363040"`);
        await queryRunner.query(`ALTER TABLE "children" DROP COLUMN "parent_id"`);
        await queryRunner.query(`ALTER TABLE "children" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" DROP CONSTRAINT "FK_b25052887733f67d04ffb05dc7b"`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" DROP COLUMN "childId"`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" ADD "childId" integer`);
        await queryRunner.query(`ALTER TABLE "exercices" DROP CONSTRAINT "FK_2df823adbe7d18f91fca035075c"`);
        await queryRunner.query(`ALTER TABLE "exercices" ALTER COLUMN "difficulty" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "exercices" DROP COLUMN "childId"`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD "childId" integer`);
        await queryRunner.query(`ALTER TABLE "media_assets" DROP CONSTRAINT "FK_a26265b38b17e763b5d1e07f4db"`);
        await queryRunner.query(`ALTER TABLE "media_assets" DROP COLUMN "childId"`);
        await queryRunner.query(`ALTER TABLE "media_assets" ADD "childId" integer`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" DROP CONSTRAINT "FK_dac6cd357379b66d4b085b1b97b"`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" DROP COLUMN "childId"`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" ADD "childId" integer`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_b6d4667a0df16f4d8f67593f215"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "childId"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "childId" integer`);
        await queryRunner.query(`ALTER TABLE "preferences" DROP CONSTRAINT "FK_da0e28a29ec0cc201ac75dbd2c0"`);
        await queryRunner.query(`ALTER TABLE "preferences" DROP COLUMN "child_id"`);
        await queryRunner.query(`ALTER TABLE "preferences" ADD "child_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "progress_reports" DROP CONSTRAINT "FK_fbe9ac3c0d7c00bd244d84f5ca7"`);
        await queryRunner.query(`ALTER TABLE "children" DROP CONSTRAINT "PK_8c5a7cbebf2c702830ef38d22b0"`);
        await queryRunner.query(`ALTER TABLE "children" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "children" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "children" ADD CONSTRAINT "PK_8c5a7cbebf2c702830ef38d22b0" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "progress_reports" DROP COLUMN "child_id"`);
        await queryRunner.query(`ALTER TABLE "progress_reports" ADD "child_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" ADD CONSTRAINT "FK_b25052887733f67d04ffb05dc7b" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD CONSTRAINT "FK_2df823adbe7d18f91fca035075c" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media_assets" ADD CONSTRAINT "FK_a26265b38b17e763b5d1e07f4db" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" ADD CONSTRAINT "FK_dac6cd357379b66d4b085b1b97b" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_b6d4667a0df16f4d8f67593f215" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "preferences" ADD CONSTRAINT "FK_da0e28a29ec0cc201ac75dbd2c0" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "children" ADD CONSTRAINT "FK_644df4cc525729181dbee86a44d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "progress_reports" ADD CONSTRAINT "FK_fbe9ac3c0d7c00bd244d84f5ca7" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "progress_reports" DROP CONSTRAINT "FK_fbe9ac3c0d7c00bd244d84f5ca7"`);
        await queryRunner.query(`ALTER TABLE "children" DROP CONSTRAINT "FK_644df4cc525729181dbee86a44d"`);
        await queryRunner.query(`ALTER TABLE "preferences" DROP CONSTRAINT "FK_da0e28a29ec0cc201ac75dbd2c0"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_b6d4667a0df16f4d8f67593f215"`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" DROP CONSTRAINT "FK_dac6cd357379b66d4b085b1b97b"`);
        await queryRunner.query(`ALTER TABLE "media_assets" DROP CONSTRAINT "FK_a26265b38b17e763b5d1e07f4db"`);
        await queryRunner.query(`ALTER TABLE "exercices" DROP CONSTRAINT "FK_2df823adbe7d18f91fca035075c"`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" DROP CONSTRAINT "FK_b25052887733f67d04ffb05dc7b"`);
        await queryRunner.query(`ALTER TABLE "progress_reports" DROP COLUMN "child_id"`);
        await queryRunner.query(`ALTER TABLE "progress_reports" ADD "child_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "children" DROP CONSTRAINT "PK_8c5a7cbebf2c702830ef38d22b0"`);
        await queryRunner.query(`ALTER TABLE "children" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "children" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "children" ADD CONSTRAINT "PK_8c5a7cbebf2c702830ef38d22b0" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "progress_reports" ADD CONSTRAINT "FK_fbe9ac3c0d7c00bd244d84f5ca7" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "preferences" DROP COLUMN "child_id"`);
        await queryRunner.query(`ALTER TABLE "preferences" ADD "child_id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "preferences" ADD CONSTRAINT "FK_da0e28a29ec0cc201ac75dbd2c0" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "childId"`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD "childId" uuid`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_b6d4667a0df16f4d8f67593f215" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" DROP COLUMN "childId"`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" ADD "childId" uuid`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" ADD CONSTRAINT "FK_dac6cd357379b66d4b085b1b97b" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media_assets" DROP COLUMN "childId"`);
        await queryRunner.query(`ALTER TABLE "media_assets" ADD "childId" uuid`);
        await queryRunner.query(`ALTER TABLE "media_assets" ADD CONSTRAINT "FK_a26265b38b17e763b5d1e07f4db" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercices" DROP COLUMN "childId"`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD "childId" uuid`);
        await queryRunner.query(`ALTER TABLE "exercices" ALTER COLUMN "difficulty" SET DEFAULT 'medium'`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD CONSTRAINT "FK_2df823adbe7d18f91fca035075c" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" DROP COLUMN "childId"`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" ADD "childId" uuid`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" ADD CONSTRAINT "FK_b25052887733f67d04ffb05dc7b" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "children" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "children" ADD "parent_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "children" ADD CONSTRAINT "FK_e7f4185179e59c184d4ad363040" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
