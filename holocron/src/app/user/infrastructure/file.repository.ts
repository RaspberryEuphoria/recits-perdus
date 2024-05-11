import fs from 'fs';

export class FileRepository {
  private readonly publicFolderPath: string;

  constructor(publicFolderPath: string) {
    this.publicFolderPath = publicFolderPath;
  }

  async uploadFile(buffer: Buffer, folder: string, fileName: string) {
    const path = `${this.publicFolderPath}/${folder}/${fileName}`;

    fs.writeFile(path, buffer, function (err) {
      if (err) throw new Error(`There was an error while uploading ${fileName}: ${err}`);

      console.log(`File ${fileName} uploaded successfully!`);

      return path;
    });
  }

  async removeFile(folder: string, fileName: string) {
    const path = `${this.publicFolderPath}/${folder}/${fileName}`;

    fs.unlink(path, function (err) {
      if (err) {
        console.error(`There was an error while removing ${fileName}: ${err}`);
      } else {
        console.log(`File ${fileName} removed successfully!`);
      }
    });
  }
}
