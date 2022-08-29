export default {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    host: process.env.PG_HOST, //alterar para DB_HOST quando for rodar com docker
    port: process.env.PG_PORT,
    username:  process.env.PG_USER,
    password:  process.env.PG_PASSWORD,
    database: process.env.PORT === '5001'
        ? process.env.PG_DB_TEST
        : process.env.PG_DB,
    entities: ['./src/entities/*.{js,ts}'],
    migrations: ['./src/database/migrations/*.{js,ts}'],
    cli: {
        'entitiesDir': './src/entities',
        'migrationsDir': './src/database/migrations',
    },
    synchronize: false,
    migrationsRun: true,
}