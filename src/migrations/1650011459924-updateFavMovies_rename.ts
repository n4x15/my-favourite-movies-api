import {MigrationInterface, QueryRunner} from "typeorm";

export class updateFavMoviesRename1650011459924 implements MigrationInterface {
    name = 'updateFavMoviesRename1650011459924'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_movies" RENAME TO "favorite_movie"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_movie" RENAME TO "favorite_movies"`);
    }

}
