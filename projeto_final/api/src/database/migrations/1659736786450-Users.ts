import {MigrationInterface, QueryRunner} from "typeorm";

export class Users1659736786450 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" (
                "id" character varying NOT NULL, 
                "nickname" character varying NOT NULL,
                "email" character varying NOT NULL UNIQUE,
                "isAdmin" boolean NOT NULL, 
                "avatar" character varying NOT NULL,                
                PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

