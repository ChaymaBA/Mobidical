import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11745920545910 implements MigrationInterface {
    name = 'Migration11745920545910'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "activities" ("Id" SERIAL NOT NULL, "description" text NOT NULL, "utilisateurId" integer, CONSTRAINT "PK_d5e7448ce73998167e4d2e10faa" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_bb44f80e15a0984379768e2591b" FOREIGN KEY ("utilisateurId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_bb44f80e15a0984379768e2591b"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role_type" SET DEFAULT 'parent'`);
        await queryRunner.query(`DROP TABLE "activities"`);
    }

}
