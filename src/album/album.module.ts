import { Module, OnModuleInit } from "@nestjs/common";
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { FilesModule } from "../files/files.module";
import { Album, AlbumSchema } from "./schemas/album.schema";
import { TrackModule } from "../track/track.module";
import { Track, TrackSchema } from "../track/schemas/track.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Album.name, schema: AlbumSchema },
      { name: Track.name, schema: TrackSchema },
    ]),
    FilesModule,
  ],
  providers: [AlbumService],
  controllers: [AlbumController]
})
export class AlbumModule  implements OnModuleInit {
  onModuleInit(): any {
    console.log("AlbumModule init");
  }
}