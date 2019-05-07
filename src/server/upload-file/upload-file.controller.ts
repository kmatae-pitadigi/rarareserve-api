import { Controller, UploadedFile, Post, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { multerOptions } from '../config/multer.config';

@Controller('upload-file')
export class UploadFileController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    @UseGuards(AuthGuard('jwt'))
    uploadFile(@UploadedFile() file) {
      console.log(file);
    }
}
