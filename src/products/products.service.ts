import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')    // mandamos un contexto, puede ser el nombre de la clase
  
  constructor(
    // DI
    @InjectRepository( Product )  // no solo para insertar, tb para query builder, transacciones, rollback
    private readonly productRepository: Repository< Product > 

  ){}
  
  async create(createProductDto: CreateProductDto) {
    
    try {
      
      if( !createProductDto.slug ) {
        createProductDto.slug = createProductDto.title
          .toLowerCase()
          .replaceAll(' ','_')
          .replaceAll("'",'')
      } else {
        createProductDto.slug = createProductDto.slug
          .toLowerCase()
          .replaceAll(' ','_')
          .replaceAll("'",'')
          
      }

      // insertar
      const product = this.productRepository.create( createProductDto ) // crea la instancia del producto con sus propiedades en memoria

      // guardar base datos
      await this.productRepository.save( product )
      
      return product

    } catch (error) {
        // console.log(error)
        this.handleDBExceptionsError( error )
    }

  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  // methodo privado para manejo de errorres cetralizados crud products
  private handleDBExceptionsError( error: any ) {

    if( error.code === '23505' ) throw new BadRequestException(error.detail)
        
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }


}
