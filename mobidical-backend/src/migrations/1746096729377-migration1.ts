import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11746096729377 implements MigrationInterface {
    name = 'Migration11746096729377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "preferences" ADD "isDefault" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role_type" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role_type" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "preferences" DROP COLUMN "isDefault"`);
    }

}
