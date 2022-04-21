import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateGenresRename1650275035394 implements MigrationInterface {
  name = 'updateGenresRename1650275035394';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "genres" RENAME TO "genre"`);
    await queryRunner.query(`ALTER TABLE "genre" RENAME COLUMN "genresId" TO "genreId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "genre" RENAME TO "genres"`);
    await queryRunner.query(`ALTER TABLE "genres" RENAME COLUMN "genreId" TO "genresId"`);
  }
}
