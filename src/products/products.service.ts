import { BadRequestException, Injectable, InternalServerErrorException, Logger, 
  NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

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

  async findOne( term: string ) {

    let product: Product;           // es de tipo product

    // validacion UUID 
    if( isUUID(term)  ) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      //product = await this.productRepository.findOneBy({ slug: term })
      const queryBuilder = this.productRepository.createQueryBuilder()
      
      // encontrar solo uno con typeORM
      product = await queryBuilder
        .where(`UPPER(title) =:title or slug =:slug`, {
          title: term.toUpperCase(),
          slug: term.toLowerCase(),
        }).getOne()     // solo uno de ambos
    }

    // const product = await  this.productRepository.findOneBy({ id })
    if( !product ) throw new NotFoundException(`Product with ${ term } not found`)
    return product
    
  }

  async update(id: string, updateProductDto: UpdateProductDto ) {

    const product = await this.productRepository.preload({
      id: id,                       // busca por este id
      ...updateProductDto           // carga todas las propiedades en este updateProductDTO
    })

    if(!product) {
      throw new NotFoundException(`Product with id: ${ id } not found`)
    }

    try {
      await this.productRepository.save( product )
      return product
      
    } catch (error) {
      this.handleDBExceptionsError(error)
    }

    // return product      puede quedar fuera el try catch
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
