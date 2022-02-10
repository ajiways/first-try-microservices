import { MigrationInterface, QueryRunner } from "typeorm";

export class orderEntity1644451094195 implements MigrationInterface {
   name = "orderEntity1644451094195";

   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            CREATE TYPE "public"."orders_status_enum" AS ENUM('PREPARING', 'REGISTRATION', 'PAYING')
        `);
      await queryRunner.query(`
            CREATE TABLE "orders" (
                "id" SERIAL NOT NULL,
                "customer_id" integer NOT NULL,
                "status" "public"."orders_status_enum" NOT NULL DEFAULT 'REGISTRATION',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id")
            )
        `);
   }

   public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
            DROP TABLE "orders"
        `);
      await queryRunner.query(`
            DROP TYPE "public"."orders_status_enum"
        `);
   }
}
