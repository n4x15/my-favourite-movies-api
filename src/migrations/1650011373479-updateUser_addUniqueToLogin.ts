import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserAddUniqueToLogin1650011373479 implements MigrationInterface {
    name = 'updateUserAddUniqueToLogin1650011373479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_a62473490b3e4578fd683235c5e"`);
    }

}
