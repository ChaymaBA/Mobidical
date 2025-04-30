import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11745929222180 implements MigrationInterface {
    name = 'Migration11745929222180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role_type" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role_type" SET DEFAULT 'parent'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "role_type" SET NOT NULL`);
    }

}
