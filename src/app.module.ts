import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TmdbRequestModule } from './tmdbrequest/tmdbRequest.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './users/user.module';
import { GenresModule } from './users/genres/genres.module';
import { FavoriteMoviesModule } from './users/favoriteMovies/favoriteMovies.module';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { JwtStrategy } from './users/authguard/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    GenresModule,
    FavoriteMoviesModule,
    TmdbRequestModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
