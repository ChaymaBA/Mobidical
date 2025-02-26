import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11740496378277 implements MigrationInterface {
    name = 'Migration11740496378277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password_hash" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_sessions_device_type_enum" AS ENUM('mobile', 'tablet', 'desktop', 'other')`);
        await queryRunner.query(`CREATE TABLE "user_sessions" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "refresh_token" character varying, "device_type" "public"."user_sessions_device_type_enum" NOT NULL, "device_info" json NOT NULL, "ip_address" character varying, "location" json, "is_active" boolean NOT NULL DEFAULT true, "last_activity_at" TIMESTAMP NOT NULL, "expires_at" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "UQ_ff5db00dec0f61218cd0d468df0" UNIQUE ("token"), CONSTRAINT "UQ_69214fd09be67af95c186be26db" UNIQUE ("refresh_token"), CONSTRAINT "PK_e93e031a5fed190d4789b6bfd83" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_devices_device_type_enum" AS ENUM('ios', 'android', 'web')`);
        await queryRunner.query(`CREATE TABLE "user_devices" ("id" SERIAL NOT NULL, "device_token" text NOT NULL, "device_type" "public"."user_devices_device_type_enum" NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "last_used_at" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_c9e7e648903a9e537347aba4371" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."login_attempts_status_enum" AS ENUM('success', 'failed')`);
        await queryRunner.query(`CREATE TABLE "login_attempts" ("id" SERIAL NOT NULL, "ip_address" character varying NOT NULL, "attempted_at" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."login_attempts_status_enum" NOT NULL, "failure_reason" character varying, "device_info" json, "userId" integer, CONSTRAINT "PK_070e613c8f768b1a70742705c5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_sessions" ADD CONSTRAINT "FK_55fa4db8406ed66bc7044328427" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_devices" ADD CONSTRAINT "FK_28bd79e1b3f7c1168f0904ce241" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "login_attempts" ADD CONSTRAINT "FK_c2b446ddee54bbf8f679dafd80a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login_attempts" DROP CONSTRAINT "FK_c2b446ddee54bbf8f679dafd80a"`);
        await queryRunner.query(`ALTER TABLE "user_devices" DROP CONSTRAINT "FK_28bd79e1b3f7c1168f0904ce241"`);
        await queryRunner.query(`ALTER TABLE "user_sessions" DROP CONSTRAINT "FK_55fa4db8406ed66bc7044328427"`);
        await queryRunner.query(`DROP TABLE "login_attempts"`);
        await queryRunner.query(`DROP TYPE "public"."login_attempts_status_enum"`);
        await queryRunner.query(`DROP TABLE "user_devices"`);
        await queryRunner.query(`DROP TYPE "public"."user_devices_device_type_enum"`);
        await queryRunner.query(`DROP TABLE "user_sessions"`);
        await queryRunner.query(`DROP TYPE "public"."user_sessions_device_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
