import {MigrationInterface, QueryRunner} from "typeorm";

export class createFavoriteMovies1648644419282 implements MigrationInterface {
    name = 'createFavoriteMovies1648644419282'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "favorite_movies" ("id" SERIAL NOT NULL, "favoriteIds" integer NOT NULL, "isWatched" boolean NOT NULL DEFAULT false, "createDate" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_7766c007e2e95de1d7a48953cbd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "favorite_movies" ADD CONSTRAINT "FK_ad08da426f2a5c6c7ba76a193ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorite_movies" DROP CONSTRAINT "FK_ad08da426f2a5c6c7ba76a193ad"`);
        await queryRunner.query(`DROP TABLE "favorite_movies"`);
    }

}
