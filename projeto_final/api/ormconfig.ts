export = {
    type: 'postgres',
    host:  process.env.PG_HOST,
    port: process.env.PG_PORT,
    username:  process.env.PG_USER,
    password:  process.env.PG_PASSWORD,
    database:  process.env.PG_DB,
    entities: ['./src/entities/*.{js,ts}'],
    migrations: ['./src/database/migrations/*.{js,ts}'],
    cli: {
        'entitiesDir': './src/entities',
        'migrationsDir': './src/database/migrations',
    },
    synchronize: false,
    migrationsRun: true,
}