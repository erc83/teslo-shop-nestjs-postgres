import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}


  @Post('product')
  @UseInterceptors( FileInterceptor( 'file', {
    fileFilter: fileFilter,
    limits: { fileSize: 5000000 },
    storage: diskStorage({
      destination: './static/uploads'
    })
  } ) )           // FileInterceptor only en Express trasfondo
  uploadProductImage( @UploadedFile() file: Express.Multer.File ) {
  
    //console.log(file)    
    if( !file ) {
      throw new BadRequestException('Make sure that the file is an image')
    }

    return {
      fileName: file.originalname
    }
  }


}
