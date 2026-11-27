import { promises as fs } from 'fs';
import path from 'path';

export class FileRepository {
  private readonly publicFolderPath: string;

  constructor(publicFolderPath: string) {
    this.publicFolderPath = publicFolderPath;
  }

  private resolve(folder: string, fileName: string) {
    // file names are generated server-side, but never allow escaping the folder
    return `${this.publicFolderPath}/${folder}/${path.basename(fileName)}`;
  }

  async uploadFile(buffer: Buffer, folder: string, fileName: string) {
    const filePath = this.resolve(folder, fileName);
    await fs.writeFile(filePath, buffer);
    return filePath;
  }

  async removeFile(folder: string, fileName: string) {
    try {
      await fs.unlink(this.resolve(folder, fileName));
    } catch (err) {
      console.error(`There was an error while removing ${fileName}: ${err}`);
    }
  }
}
