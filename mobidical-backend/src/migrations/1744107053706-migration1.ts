import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11744107053706 implements MigrationInterface {
    name = 'Migration11744107053706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."preferences_audio_sensitivity_enum" AS ENUM('low', 'medium', 'high')`);
        await queryRunner.query(`CREATE TABLE "preferences" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "child_id" uuid NOT NULL, "preferred_colors" character varying(255) NOT NULL, "audio_sensitivity" "public"."preferences_audio_sensitivity_enum" NOT NULL, "prefers_animations" boolean NOT NULL DEFAULT false, "visual_complexity" integer NOT NULL, "favorite_activities" json, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_17f8855e4145192bbabd91a51be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "media_assets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying(255) NOT NULL, "url" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "childId" uuid, CONSTRAINT "PK_ca47e9f67a5e5d8af1e75d66ee6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."ai_recommendations_recommendation_type_enum" AS ENUM('activity', 'difficulty', 'approach')`);
        await queryRunner.query(`CREATE TABLE "ai_recommendations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "recommendation_type" "public"."ai_recommendations_recommendation_type_enum" NOT NULL, "recommendations" json NOT NULL, "reasoning" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "sessionId" uuid, "childId" uuid, CONSTRAINT "PK_57aa33b4356a91e94e98bcd3f2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "started_at" TIMESTAMP NOT NULL, "ended_at" TIMESTAMP NOT NULL, "device_info" json, "notes" text, "childId" uuid, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercise_assignments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_completed" boolean NOT NULL DEFAULT false, "attempts" integer NOT NULL DEFAULT '0', "score" double precision NOT NULL DEFAULT '0', "assigned_at" TIMESTAMP NOT NULL DEFAULT now(), "completed_at" TIMESTAMP, "childId" uuid, "exerciseId" integer, CONSTRAINT "PK_451d1834b231f17090431841965" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "children" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "parent_id" integer NOT NULL, "first_name" character varying(100) NOT NULL, "last_name" character varying(100) NOT NULL, "birth_date" date NOT NULL, "gender" character varying(10) NOT NULL, "diagnosis_details" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "duration" integer, CONSTRAINT "PK_8c5a7cbebf2c702830ef38d22b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reward" ("Id" SERIAL NOT NULL, "Nom" character varying(255) NOT NULL, "pointsNecessaires" integer NOT NULL, CONSTRAINT "PK_fda74681b4bf90831bda2b2e2d6" PRIMARY KEY ("Id"))`);
        await queryRunner.query(`CREATE TABLE "progress_reports" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "child_id" uuid NOT NULL, "report_period_start" date NOT NULL, "report_period_end" date NOT NULL, "cognitive_metrics" json, "social_metrics" json, "motor_metrics" json, "communication_metrics" json, "observations" character varying(500) NOT NULL, "generated_at" TIMESTAMP NOT NULL DEFAULT now(), "rewardId" integer, "userId" integer, CONSTRAINT "PK_175179020a43d5ec75ab1d6a04f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."categories_name_enum" AS ENUM('communication skills', 'social interaction', 'motor skills', 'cognitive game')`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" "public"."categories_name_enum" NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."exercices_difficulty_enum" AS ENUM('easy', 'medium', 'hard')`);
        await queryRunner.query(`CREATE TABLE "exercices" ("id" SERIAL NOT NULL, "difficulty" "public"."exercices_difficulty_enum" NOT NULL DEFAULT 'medium', "description" character varying(500), "name" character varying(255) NOT NULL, "pieces" json NOT NULL, "userId" integer, "progressReportId" uuid, "categoryId" integer, "childId" uuid, CONSTRAINT "PK_eff59bcb35c452829a0836c1a9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_type_enum" AS ENUM('parent', 'educator', 'therapist')`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role_type" "public"."users_role_type_enum" NOT NULL DEFAULT '[object Object]'`);
        await queryRunner.query(`ALTER TABLE "preferences" ADD CONSTRAINT "FK_da0e28a29ec0cc201ac75dbd2c0" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "media_assets" ADD CONSTRAINT "FK_a26265b38b17e763b5d1e07f4db" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" ADD CONSTRAINT "FK_928f0c3a77755c7372015e775d5" FOREIGN KEY ("sessionId") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" ADD CONSTRAINT "FK_dac6cd357379b66d4b085b1b97b" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sessions" ADD CONSTRAINT "FK_b6d4667a0df16f4d8f67593f215" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" ADD CONSTRAINT "FK_b25052887733f67d04ffb05dc7b" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" ADD CONSTRAINT "FK_9030a83de0a200cbedc7ba71694" FOREIGN KEY ("exerciseId") REFERENCES "exercices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "children" ADD CONSTRAINT "FK_e7f4185179e59c184d4ad363040" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "progress_reports" ADD CONSTRAINT "FK_fbe9ac3c0d7c00bd244d84f5ca7" FOREIGN KEY ("child_id") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "progress_reports" ADD CONSTRAINT "FK_db1a35b4e2e32420437068dfc26" FOREIGN KEY ("rewardId") REFERENCES "reward"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "progress_reports" ADD CONSTRAINT "FK_e9d415c14355b9be8bd52e351ee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD CONSTRAINT "FK_bd3ba55f66fe00eef89efaf1309" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD CONSTRAINT "FK_7f9a938620e035010bf3d0bbce4" FOREIGN KEY ("progressReportId") REFERENCES "progress_reports"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD CONSTRAINT "FK_8809099214b5605332c548b0526" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercices" ADD CONSTRAINT "FK_2df823adbe7d18f91fca035075c" FOREIGN KEY ("childId") REFERENCES "children"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercices" DROP CONSTRAINT "FK_2df823adbe7d18f91fca035075c"`);
        await queryRunner.query(`ALTER TABLE "exercices" DROP CONSTRAINT "FK_8809099214b5605332c548b0526"`);
        await queryRunner.query(`ALTER TABLE "exercices" DROP CONSTRAINT "FK_7f9a938620e035010bf3d0bbce4"`);
        await queryRunner.query(`ALTER TABLE "exercices" DROP CONSTRAINT "FK_bd3ba55f66fe00eef89efaf1309"`);
        await queryRunner.query(`ALTER TABLE "progress_reports" DROP CONSTRAINT "FK_e9d415c14355b9be8bd52e351ee"`);
        await queryRunner.query(`ALTER TABLE "progress_reports" DROP CONSTRAINT "FK_db1a35b4e2e32420437068dfc26"`);
        await queryRunner.query(`ALTER TABLE "progress_reports" DROP CONSTRAINT "FK_fbe9ac3c0d7c00bd244d84f5ca7"`);
        await queryRunner.query(`ALTER TABLE "children" DROP CONSTRAINT "FK_e7f4185179e59c184d4ad363040"`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" DROP CONSTRAINT "FK_9030a83de0a200cbedc7ba71694"`);
        await queryRunner.query(`ALTER TABLE "exercise_assignments" DROP CONSTRAINT "FK_b25052887733f67d04ffb05dc7b"`);
        await queryRunner.query(`ALTER TABLE "sessions" DROP CONSTRAINT "FK_b6d4667a0df16f4d8f67593f215"`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" DROP CONSTRAINT "FK_dac6cd357379b66d4b085b1b97b"`);
        await queryRunner.query(`ALTER TABLE "ai_recommendations" DROP CONSTRAINT "FK_928f0c3a77755c7372015e775d5"`);
        await queryRunner.query(`ALTER TABLE "media_assets" DROP CONSTRAINT "FK_a26265b38b17e763b5d1e07f4db"`);
        await queryRunner.query(`ALTER TABLE "preferences" DROP CONSTRAINT "FK_da0e28a29ec0cc201ac75dbd2c0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_type"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_type_enum"`);
        await queryRunner.query(`DROP TABLE "exercices"`);
        await queryRunner.query(`DROP TYPE "public"."exercices_difficulty_enum"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TYPE "public"."categories_name_enum"`);
        await queryRunner.query(`DROP TABLE "progress_reports"`);
        await queryRunner.query(`DROP TABLE "reward"`);
        await queryRunner.query(`DROP TABLE "children"`);
        await queryRunner.query(`DROP TABLE "exercise_assignments"`);
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "ai_recommendations"`);
        await queryRunner.query(`DROP TYPE "public"."ai_recommendations_recommendation_type_enum"`);
        await queryRunner.query(`DROP TABLE "media_assets"`);
        await queryRunner.query(`DROP TABLE "preferences"`);
        await queryRunner.query(`DROP TYPE "public"."preferences_audio_sensitivity_enum"`);
    }

}
