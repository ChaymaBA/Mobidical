import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11740577673501 implements MigrationInterface {
    name = 'Migration11740577673501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "feedbacks" ("Id" SERIAL NOT NULL, "commentaire" text NOT NULL, "note" integer NOT NULL, "userId" integer, CONSTRAINT "PK_78c6e34d6b6e649f4ab6ae5b17c" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "recompenses" ("Id" SERIAL NOT NULL, "Nom" character varying(255) NOT NULL, "pointsNecessaires" integer NOT NULL, CONSTRAINT "PK_7855aa1b7c987a315d6b22e4e44" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "progressions" ("Id" SERIAL NOT NULL, "score" double precision NOT NULL, "date" character varying(255) NOT NULL, "exerciceId" integer, "recompenseId" integer, CONSTRAINT "PK_553a2ba1d6b4357f8c1a5391a29" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "exercices" ("Id" SERIAL NOT NULL, "NiveauDeDifficulte" integer NOT NULL, "type" character varying(255) NOT NULL, "userId" integer, "progressionId" integer, CONSTRAINT "PK_5f152d67b366f25de30ebcf764e" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "activities" ("Id" SERIAL NOT NULL, "description" text NOT NULL, "utilisateurId" integer, CONSTRAINT "PK_d5e7448ce73998167e4d2e10faa" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_e9b6450d76be18b05b5f09d577b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "progressions" ADD CONSTRAINT "FK_1634e000bd450e19c9f2e302b43" FOREIGN KEY ("exerciceId") REFERENCES "exercices"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "progressions" ADD CONSTRAINT "FK_7bc7610056aa726fc1897f99e91" FOREIGN KEY ("recompenseId") REFERENCES "recompenses"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD CONSTRAINT "FK_bd3ba55f66fe00eef89efaf1309" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD CONSTRAINT "FK_e1edf7c34d39b9231f26c10ce48" FOREIGN KEY ("progressionId") REFERENCES "progressions"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities" ADD CONSTRAINT "FK_bb44f80e15a0984379768e2591b" FOREIGN KEY ("utilisateurId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activities" DROP CONSTRAINT "FK_bb44f80e15a0984379768e2591b"`);
        await queryRunner.query(`ALTER TABLE "exercices" DROP CONSTRAINT "FK_e1edf7c34d39b9231f26c10ce48"`);
        await queryRunner.query(`ALTER TABLE "exercices" DROP CONSTRAINT "FK_bd3ba55f66fe00eef89efaf1309"`);
        await queryRunner.query(`ALTER TABLE "progressions" DROP CONSTRAINT "FK_7bc7610056aa726fc1897f99e91"`);
        await queryRunner.query(`ALTER TABLE "progressions" DROP CONSTRAINT "FK_1634e000bd450e19c9f2e302b43"`);
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_e9b6450d76be18b05b5f09d577b"`);
        await queryRunner.query(`DROP TABLE "activities"`);
        await queryRunner.query(`DROP TABLE "exercices"`);
        await queryRunner.query(`DROP TABLE "progressions"`);
        await queryRunner.query(`DROP TABLE "recompenses"`);
        await queryRunner.query(`DROP TABLE "feedbacks"`);
    }

}
