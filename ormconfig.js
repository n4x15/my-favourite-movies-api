module.exports = {
  type: 'postgres',
  url: process.env.POSTGRES_DATABASE,
  entities: ['dist/**/*.entity{*.ts,.js}'],
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  cli: {
    migrations_dir: ['src/migrations/*{.ts,.js}'],
  },
};
