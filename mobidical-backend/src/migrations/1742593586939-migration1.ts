import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11742593586939 implements MigrationInterface {
    name = 'Migration11742593586939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercices" DROP COLUMN "difficulty"`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD "difficulty" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercices" DROP COLUMN "difficulty"`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD "difficulty" integer NOT NULL`);
    }

}
