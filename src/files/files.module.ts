import { Module, OnModuleInit } from "@nestjs/common";
import { FilesService } from "./files.service";

@Module({
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule implements OnModuleInit {
  onModuleInit(): any {
    console.log("FilesModule init");
  }
}