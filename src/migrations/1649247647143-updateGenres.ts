import {MigrationInterface, QueryRunner} from "typeorm";

export class updateGenres1649247647143 implements MigrationInterface {
    name = 'updateGenres1649247647143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genres" RENAME COLUMN "genresIds" TO "genresId"`);
        await queryRunner.query(`ALTER TABLE "genres" ALTER COLUMN "genresId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "genres" ALTER COLUMN "isChecked" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genres" ALTER COLUMN "isChecked" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "genres" ALTER COLUMN "genresId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "genres" RENAME COLUMN "genresId" TO "genresIds"`);
    }

}
