import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { Track, TrackDocument } from "./schemas/track.schema";
import { Comment, CommentDocument } from "./schemas/comment.schema";
import { CreateTrackDto } from "./dto/create-track.dto";
import { AddCommentDto } from "./dto/add-comment.dto";
import { FilesService, FileType } from "../files/files.service";

@Injectable()
export class TrackService {

  constructor(@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
              @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
              private fileService: FilesService) {
  }


  async create(dto: CreateTrackDto,picture, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    return await this.trackModel.create({ ...dto, listens: 0, audio: audioPath, picture: picturePath });
  }


  async getAll(count = 10, offset = 0): Promise<Track[]> {
    return this.trackModel.find().skip(Number(offset)).limit(Number(count));
  }


  async getOne(id: ObjectId): Promise<Track> {
    return this.trackModel.findById(id).populate("comments");
  }


  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    // @ts-ignore
    return track._id;
  }


  async addComment(dto: AddCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment);
    //track.comments.push(comment._id)
    await track.save();
    return comment;
  }


  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1
    track.save()
  }


  async search(query: string): Promise<Track[]> {
    return this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') }
    });
  }

}
