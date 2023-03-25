import { Module, OnModuleInit } from "@nestjs/common";
import { TrackModule } from "./track/track.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "node:path";
import { AlbumModule } from './album/album.module';


@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "static"),
      serveRoot: "/static"
    }),
    //ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'static')}),
    MongooseModule.forRoot("mongodb://localhost/nest"),
    TrackModule,
    AlbumModule
  ]
})
export class AppModule implements OnModuleInit {
  onModuleInit(): any {
    console.log("AppModule init");
  }
}