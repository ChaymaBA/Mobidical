import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11743124484717 implements MigrationInterface {
    name = 'Migration11743124484717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "progressions" DROP CONSTRAINT "FK_1634e000bd450e19c9f2e302b43"`);
        await queryRunner.query(`ALTER TABLE "progressions" RENAME COLUMN "exerciceId" TO "gameId"`);
        await queryRunner.query(`CREATE TABLE "games" ("id" SERIAL NOT NULL, "difficulty" character varying(50) NOT NULL, "category" character varying(255) NOT NULL, "description" character varying(500), "name" character varying(255) NOT NULL, "userId" integer, "progressionId" integer, CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'USER')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER'`);
        await queryRunner.query(`ALTER TABLE "progressions" ADD CONSTRAINT "FK_41408f8f159484f63f053d8fadc" FOREIGN KEY ("gameId") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_49dc618f9811c67dec86f0d2049" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "games" ADD CONSTRAINT "FK_944fc17ae76ee31a95a0ad2ef1f" FOREIGN KEY ("progressionId") REFERENCES "progressions"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_944fc17ae76ee31a95a0ad2ef1f"`);
        await queryRunner.query(`ALTER TABLE "games" DROP CONSTRAINT "FK_49dc618f9811c67dec86f0d2049"`);
        await queryRunner.query(`ALTER TABLE "progressions" DROP CONSTRAINT "FK_41408f8f159484f63f053d8fadc"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`ALTER TABLE "progressions" RENAME COLUMN "gameId" TO "exerciceId"`);
        await queryRunner.query(`ALTER TABLE "progressions" ADD CONSTRAINT "FK_1634e000bd450e19c9f2e302b43" FOREIGN KEY ("exerciceId") REFERENCES "exercices"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
