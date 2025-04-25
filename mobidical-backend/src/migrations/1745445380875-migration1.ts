import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11745445380875 implements MigrationInterface {
    name = 'Migration11745445380875'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise_assignments" ADD "checkPoint" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" ADD "rewardId" integer`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" ADD CONSTRAINT "FK_223651ffffb9c8a2c39b355bb53" FOREIGN KEY ("rewardId") REFERENCES "reward"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercise_assignments" DROP CONSTRAINT "FK_223651ffffb9c8a2c39b355bb53"`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" DROP COLUMN "rewardId"`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" DROP COLUMN "checkPoint"`);
    }

}
