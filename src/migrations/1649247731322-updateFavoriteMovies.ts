import {MigrationInterface, QueryRunner} from "typeorm";

export class updateFavoriteMovies1649247731322 implements MigrationInterface {
    name = 'updateFavoriteMovies1649247731322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_movies" RENAME COLUMN "favoriteIds" TO "favoriteId"`);
        await queryRunner.query(`ALTER TABLE "favorite_movies" ALTER COLUMN "favoriteId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_movies" ALTER COLUMN "favoriteId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "favorite_movies" RENAME COLUMN "favoriteId" TO "favoriteIds"`);
    }

}
