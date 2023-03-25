import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { FilesService, FileType } from "../files/files.service";
import { Album, AlbumDocument } from "./schemas/album.schema";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { AddTrackDto } from "./dto/add-track.dto";
import { Track, TrackDocument } from "../track/schemas/track.schema";


@Injectable()
export class AlbumService {

  constructor(@InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
              @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
              private fileService: FilesService) {
  }


  async create(dto: CreateAlbumDto, picture): Promise<Album> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    return await this.albumModel.create({ ...dto, picture: picturePath });
  }


  async getAll(count = 10, offset = 0): Promise<Album[]> {
    return this.albumModel.find().skip(Number(offset)).limit(Number(count));
  }


  async getOne(id: ObjectId): Promise<Album> {
    return this.albumModel.findById(id).populate("tracks");
  }


  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.albumModel.findByIdAndDelete(id);
    // @ts-ignore
    return track._id;
  }





  async addTrack(dto: AddTrackDto): Promise<Album> {

    const album = await this.albumModel.findById(dto.albumId);
    const track = await this.trackModel.findById(dto.trackId);

    album.tracks.push(track);
    // @ts-ignore
    //album.tracks.push(dto.trackId)
    await album.save();
    return album;

  }
}
