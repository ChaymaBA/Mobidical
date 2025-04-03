import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11743593374404 implements MigrationInterface {
    name = 'Migration11743593374404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" ADD "pieces" json NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games" DROP COLUMN "pieces"`);
    }

}
