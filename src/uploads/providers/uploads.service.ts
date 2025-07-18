import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
  public async uploadFile(file: Express.Multer.File): Promise<{ message: string }> {
    // Here you would typically handle the file upload logic, e.g., saving the file to a storage service.
    return { message: 'File uploaded successfully!' };
  }
}
