import {MigrationInterface, QueryRunner} from "typeorm";

export class Products1658426788923 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "products" (
                "id" SERIAL NOT NULL, 
                "name" character varying NOT NULL UNIQUE,
                "price" float NOT NULL,
                "quantity" integer NOT NULL, 
                "image" character varying NOT NULL,
                "size" character varying NOT NULL,  
                PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
