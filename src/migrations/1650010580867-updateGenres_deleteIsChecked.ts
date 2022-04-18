import {MigrationInterface, QueryRunner} from "typeorm";

export class updateGenresDeleteIsChecked1650010580867 implements MigrationInterface {
    name = 'updateGenresDeleteIsChecked1650010580867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genres" DROP COLUMN "isChecked"`);
        await queryRunner.query(`ALTER TABLE "genres" ALTER COLUMN "genresId" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "genres" ALTER COLUMN "genresId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "genres" ADD "isChecked" boolean NOT NULL DEFAULT false`);
    }

}
