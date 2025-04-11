import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11744370193112 implements MigrationInterface {
    name = 'Migration11744370193112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "children" DROP COLUMN "duration"`);
        await queryRunner.query(`ALTER TABLE "preferences" DROP CONSTRAINT "PK_17f8855e4145192bbabd91a51be"`);
        await queryRunner.query(`ALTER TABLE "preferences" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "preferences" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "preferences" ADD CONSTRAINT "PK_17f8855e4145192bbabd91a51be" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "exercices" DROP CONSTRAINT "FK_7f9a938620e035010bf3d0bbce4"`);
        await queryRunner.query(`ALTER TABLE "progress_reports" DROP CONSTRAINT "PK_175179020a43d5ec75ab1d6a04f"`);
        await queryRunner.query(`ALTER TABLE "progress_reports" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "progress_reports" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "progress_reports" ADD CONSTRAINT "PK_175179020a43d5ec75ab1d6a04f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "exercices" DROP COLUMN "progressReportId"`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD "progressReportId" integer`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD CONSTRAINT "FK_7f9a938620e035010bf3d0bbce4" FOREIGN KEY ("progressReportId") REFERENCES "progress_reports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercices" DROP CONSTRAINT "FK_7f9a938620e035010bf3d0bbce4"`);
        await queryRunner.query(`ALTER TABLE "exercices" DROP COLUMN "progressReportId"`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD "progressReportId" uuid`);
        await queryRunner.query(`ALTER TABLE "progress_reports" DROP CONSTRAINT "PK_175179020a43d5ec75ab1d6a04f"`);
        await queryRunner.query(`ALTER TABLE "progress_reports" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "progress_reports" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "progress_reports" ADD CONSTRAINT "PK_175179020a43d5ec75ab1d6a04f" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD CONSTRAINT "FK_7f9a938620e035010bf3d0bbce4" FOREIGN KEY ("progressReportId") REFERENCES "progress_reports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "preferences" DROP CONSTRAINT "PK_17f8855e4145192bbabd91a51be"`);
        await queryRunner.query(`ALTER TABLE "preferences" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "preferences" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "preferences" ADD CONSTRAINT "PK_17f8855e4145192bbabd91a51be" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "children" ADD "duration" integer`);
    }

}
