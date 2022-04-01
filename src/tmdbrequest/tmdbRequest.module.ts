import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TmdbRequestController } from "./tmdbRequest.controller";
import { TmdbRequestService } from "./tmdbRequest.service";

@Module({
    imports: [HttpModule],
    controllers: [TmdbRequestController],
    providers: [TmdbRequestService]
  })
  export class TmdbRequestModule {}
  