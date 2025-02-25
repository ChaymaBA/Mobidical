import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'db', // default to 'db' if not set
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: false,
  dropSchema: false,
  entities: [__dirname + '/../../entities/**/*.ts'], // Correct path for entities
  migrations: [__dirname + '/../../migrations/**/*.ts'], // Correct path for migrations
  subscribers: [__dirname + '/../../subscribers/**/*.ts'], // Correct path for subscribers
  migrationsTableName: 'typeorm_migrations',
});
