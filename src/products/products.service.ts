import { BadRequestException, Injectable, InternalServerErrorException, Logger, 
  NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

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
      
      // validacion se movio a product.entity.ts

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

  findAll( paginationDto:PaginationDto ) {
    // destructuring
    const {limit = 10, offset = 0 } = paginationDto      // siempre obtengo un valor si no viene

    return this.productRepository.find({
      take: limit,
      skip: offset,
        //TODO: relaciones
    })
  }

  async findOne( id: string ) {

    const product = await  this.productRepository.findOneBy({ id })
    if( !product ) throw new NotFoundException(`Product with id ${ id } not found`)

    return product
    
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string ) {
    const product = await this.findOne( id )
    await this.productRepository.remove( product )
  }

  // methodo privado para manejo de errorres cetralizados crud products
  private handleDBExceptionsError( error: any ) {

    if( error.code === '23505' ) throw new BadRequestException(error.detail)
        
    this.logger.error(error)
    throw new InternalServerErrorException('Unexpected error, check server logs')
  }


}
