import {MigrationInterface, QueryRunner} from "typeorm";

export class ShoppingCart1659361066011 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shoppingcart" (
            "id" SERIAL NOT NULL, 
            "user_id" integer NOT NULL,
            "product_id" integer NOT NULL,
            FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
            FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
            PRIMARY KEY ("id")
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shoppingcart"`);
    }

}
