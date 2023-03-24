import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from "mongoose";
import {Track} from "./track.schema";
import * as mongoose from 'mongoose'

//export type CommentDocument = Comment & Document;
export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop()
  username: string;

  @Prop()
  text: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Track'})
  track: Track;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);