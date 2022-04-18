import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { UserModule } from '../user.module';
import { Genre } from './genres.entity';
import { GenresResolver } from './genres.resolver';
import { GenresService } from './genres.service';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, User]), UserModule],
  providers: [GenresResolver, GenresService],
})
export class GenresModule {}
