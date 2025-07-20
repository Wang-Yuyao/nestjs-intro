import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Upload } from '../upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { ConfigService } from '@nestjs/config';
import { UploadFile } from '../interfaces/upload-file.interface';
import { fileTypes } from '../enums/file-types.enum';

@Injectable()
export class UploadsService {
  constructor(
    private readonly uploadToAwsProvider: UploadToAwsProvider,

    private readonly configService: ConfigService,

    @InjectRepository(Upload)
    private readonly uploadsRepository: Repository<Upload>, // Assuming you have a repository for Upload entity
  ) {}
  public async uploadFile(file: Express.Multer.File){
    // Here you would typically handle the file upload logic, e.g., saving the file to a storage service.
    if (!['image/gif', 'image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype)) {
     throw new Error('Unsupported file type');
    }

    try {
      const name = await this.uploadToAwsProvider.fileUpload(file);
      const uploadFile: UploadFile = {
        name: name,
        path: `https://${this.configService.get('appConfig.awsCloudfrontUrl')}/${name}`,
        type: fileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      }
      const upload = this.uploadsRepository.create(uploadFile);
      return await this.uploadsRepository.save(upload);
    } catch (error) {
      throw new Error(`File upload failed: ${error.message}`);
    }
  }
}
