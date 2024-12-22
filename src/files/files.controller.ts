import { Response } from 'express'

import { Controller, Get, Post, Param, UseInterceptors, UploadedFile, BadRequestException, Res } 
from '@nestjs/common';

import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { fileFilter } from './helpers/fileFilter.helper';
import { fileRename } from './helpers/fileRename.helper';
import { ConfigService } from '@nestjs/config';


@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get('product/:imageName')
  findProductImage( 
    @Res() res: Response,             // @Res() donde manualmente indicamos la respuesta
    @Param('imageName') imageName: string 
  ){
    try {
      const path = this.filesService.getStaticProductImage( imageName )
      //return imageName
      //return path

      //return res.status(403).json({
      //  ok: false,
      //  path: path,
      //})

      res.sendFile( path )  // enviar message
    } catch (error) {
      // Manejo de errores, en caso de que no se encuentre la imagen u ocurra algún problema
    return res.status(500).json({
        ok: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }

  }

  @Post('product')
  @UseInterceptors( FileInterceptor( 'file', {
    fileFilter: fileFilter,
    limits: { fileSize: 5000000 },
    storage: diskStorage({
      //destination: './static/uploads',
      destination: './static/products',
      filename: fileRename
    })
  } ) )           // FileInterceptor only en Express trasfondo
  uploadProductImage( @UploadedFile() file: Express.Multer.File ) {
  
    //console.log(file)    
    if( !file ) {
      throw new BadRequestException('Make sure that the file is an image')
    }

    //const secureUrl = `${ file.filename }`
    const secureUrl = `${ this.configService.get('HOST_API') }/files/product/${ file.filename }`

    return {
      //fileName: file.originalname
      secureUrl
    }
  }


}
