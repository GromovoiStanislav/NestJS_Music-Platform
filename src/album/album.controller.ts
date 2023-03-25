import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from "@nestjs/common";
import { AlbumService } from "./album.service";
import { ObjectId } from "mongoose";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { AddTrackDto } from "./dto/add-track.dto";

@Controller('album')
export class AlbumController {

  constructor(private albumService: AlbumService) {
  }

  @Post()
  @UseInterceptors(FileInterceptor("picture"))
  create(@UploadedFile() picture, @Body() dto: CreateAlbumDto) {
    return this.albumService.create(dto, picture);
  }


  @Get()
  getAll(@Query("count") count: number,
         @Query("offset") offset: number) {
    return this.albumService.getAll(count, offset);
  }


  @Get(":id")
  getOne(@Param("id") id: ObjectId) {
    return this.albumService.getOne(id);
  }


  @Delete(":id")
  delete(@Param("id") id: ObjectId) {
    return this.albumService.delete(id);
  }

  @Post("/tracks")
  addComment(@Body() dto: AddTrackDto) {
    return this.albumService.addTrack(dto);
  }

}
