import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TmdbRequestResolver } from './tmdbRequest.resolver';
import { TmdbRequestService } from './tmdbRequest.service';

@Module({
  imports: [HttpModule],
  providers: [TmdbRequestService, TmdbRequestResolver],
  exports: [TmdbRequestService],
})
export class TmdbRequestModule {}
