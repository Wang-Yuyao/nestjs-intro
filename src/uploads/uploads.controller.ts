import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiHeaders, ApiOperation } from '@nestjs/swagger';
import { UploadsService } from './providers/uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService
  ){}


  @UseInterceptors(FileInterceptor('file'))
  @ApiHeaders([
    {
      name: 'Content-Type',
      description: 'multipart/form-data',
    },
    {
      name: 'Authorization',
      description: 'Bearer token for authentication'
    },
  ])
  @ApiOperation({
    summary: 'Upload a file',
    description: 'Endpoint to upload a file using multipart/form-data.'
  })
  @Post('file')
  public uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Here you would typically handle the file upload logic, e.g., saving the file to a storage service.
    return this.uploadsService.uploadFile(file);
  }
}
