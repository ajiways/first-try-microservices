import { MigrationInterface, QueryRunner } from 'typeorm';

export class userEntity1644420985386 implements MigrationInterface {
  name = 'userEntity1644420985386';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "login" character varying NOT NULL,
                "phone" numeric NOT NULL,
                "first_name" character varying(56) NOT NULL,
                "last_name" character varying(56) NOT NULL,
                "patronymic" character varying(56) NOT NULL,
                "password" character varying(256) NOT NULL,
                CONSTRAINT "UQ_2d443082eccd5198f95f2a36e2c" UNIQUE ("login"),
                CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "users"
        `);
  }
}
