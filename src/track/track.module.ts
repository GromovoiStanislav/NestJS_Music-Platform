import { Module, OnModuleInit } from "@nestjs/common";
import { TrackService } from "./track.service";
import { TrackController } from "./track.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Track, TrackSchema } from "./schemas/track.schema";
import { Comment, CommentSchema } from "./schemas/comment.schema";
import { FilesModule } from "../files/files.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Track.name, schema: TrackSchema },
      { name: Comment.name, schema: CommentSchema }
    ]),
    FilesModule
  ],
  providers: [TrackService],
  controllers: [TrackController]
})
export class TrackModule implements OnModuleInit {
  onModuleInit(): any {
    console.log("TrackModule init");
  }
}