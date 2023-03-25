import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from "mongoose";
import * as mongoose from 'mongoose'
import { Track } from "../../track/schemas/track.schema";


//export type AlbumDocument = Track & Document;
export type AlbumDocument = HydratedDocument<Album>;

@Schema()
export class Album {
  @Prop()
  name: string;

  @Prop()
  author: string;

  @Prop()
  picture: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Track'}]})
  tracks: Track[];
}

export const AlbumSchema = SchemaFactory.createForClass(Album);