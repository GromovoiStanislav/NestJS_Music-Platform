import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { join } from "node:path";
import * as fs from "fs";

export enum FileType {
  AUDIO = "audio",
  IMAGE = "image"
}

@Injectable()
export class FilesService {

  createFile(type: FileType, file): string {
    try {
      const fileExtension = file.originalname.split(".").pop();
      //const fileExtension: string = path.parse(file.originalname).ext;
      //const fileExtension: string = path.extname(file.originalname);
      const fileName = randomUUID() + "." + fileExtension;
      const filePath = join(__dirname, '..', 'static', type)
      //const filePath = join(process.cwd(), "static", type);
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(join(filePath, fileName), file.buffer);
      return type + "/" + fileName;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  removeFile(fileName: string) {
  }
}
