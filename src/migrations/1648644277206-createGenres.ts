import {MigrationInterface, QueryRunner} from "typeorm";

export class createGenres1648644277206 implements MigrationInterface {
    name = 'createGenres1648644277206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "genres" ("id" SERIAL NOT NULL, "genresIds" integer NOT NULL, "isChecked" boolean NOT NULL, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "genres" ADD CONSTRAINT "FK_6059f3a850eb464a1a0b7b70bb1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genres" DROP CONSTRAINT "FK_6059f3a850eb464a1a0b7b70bb1"`);
        await queryRunner.query(`DROP TABLE "genres"`);
    }

}
