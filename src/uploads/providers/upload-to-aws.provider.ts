import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { v4 as uuid4 } from 'uuid';

@Injectable()
export class UploadToAwsProvider {
  constructor(
    private readonly configService: ConfigService, // Assuming you have a ConfigService to manage configurations
  ) {}

  public async fileUpload(file: Express.Multer.File) {
    const s3 = new S3();
    try {
      const uploadResult = await s3.upload({
        Bucket: this.configService.get<string>('appConfig.awsBucketName') ?? (() => { throw new Error('AWS bucket name is not defined'); })(),
        Body: file.buffer, // File buffer
        Key: this.generateFileName(file), // Unique file name 
        ContentType: file.mimetype, // File MIME type
    }).promise();
      return uploadResult.Key;
    } catch (error) {
      console.error('Error uploading file to AWS S3:', error);
      throw new Error('File upload failed');
    }
  }

  generateFileName(file: Express.Multer.File) {
    let name = file.originalname.split('.')[0];
    name.replace(/\s/g, '').trim(); // Replace non-alphanumeric characters with hyphens
    let extension = path.extname(file.originalname);
    let timestamp = new Date().getTime().toString().trim();

    return `${name}-${timestamp}-${uuid4()}${extension}`; // Return the new file name
  }
}
