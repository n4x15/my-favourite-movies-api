import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TmdbRequestModule } from './tmdbrequest/tmdbRequest.module';

@Module({
  imports: [TypeOrmModule.forRoot(), TmdbRequestModule],
})
export class AppModule {}
