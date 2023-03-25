import {ObjectId} from "mongoose";

export class AddTrackDto {
  readonly albumId: ObjectId;
  readonly trackId: ObjectId;
}