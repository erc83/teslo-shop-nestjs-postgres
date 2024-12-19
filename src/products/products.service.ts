import { BadRequestException, Injectable, InternalServerErrorException, Logger, 
  NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { ProductImage } from './entities/product-image.entity';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService')    // mandamos un contexto, puede ser el nombre de la clase
  
  constructor(
    // DI
    @InjectRepository( Product )  // no solo para insertar, tb para query builder, transacciones, rollback
    private readonly productRepository: Repository< Product >, 

    @InjectRepository(ProductImage)
    private readonly  productImageRepository: Repository<ProductImage>,

  ){}
  
  async create(createProductDto: CreateProductDto) {
    
    try {
      const { images = [], ...productDetail } = createProductDto

      // insertar
      const product = this.productRepository.create({ 
        ...productDetail, 
        images: images.map( image => this.productImageRepository.create({ url: image })) 
      }) 

      // guardar base datos
      await this.productRepository.save( product )  // guarda product como imagenes
      
      return {...product, images: images }    //  "images": ["http://image1.jpg","http://image2.jpg"]

    } catch (error) {
        // console.log(error)
        this.handleDBExceptionsError( error )
    }

  }

  async findAll( paginationDto:PaginationDto ) {
    // destructuring
    const {limit = 10, offset = 0 } = paginationDto      // siempre obtengo un valor si no viene

    // obtener los productos con imagenes como un array con objeto   images: [{id:1, url: http://image1.jpg}]
    /* return this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      }
    })  */

    // opcion 2 mostrando las imagenes como un arreglo para el front
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        images: true,
      }
    })

    return products.map( product => ({
      ...product,
      images: product.images.map( img => img.url )
    }))

  }


  async findOne( term: string ) {

    let product: Product;           // es de tipo product

    // validacion UUID 
    if( isUUID(term)  ) {
      product = await this.productRepository.findOneBy({ id: term });
      //product = await this.productRepository.findOne({ where: { id: term }, relations:{ images:true } } );  // llamando las imagenes usando relations
    } else {
      //product = await this.productRepository.findOneBy({ slug: term })
      const queryBuilder = this.productRepository.createQueryBuilder('prod')   // alias tabla product

      // encontrar solo uno con typeORM
      product = await queryBuilder
        .where(`UPPER(title) =:title or slug =:slug`, {
          title: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .leftJoinAndSelect('prod.images', 'prodImages')  //  relacion     y   alias tabla product_images
        .getOne()     // solo uno de ambos
    }

    // const product = await  this.productRepository.findOneBy({ id })
    if( !product ) throw new NotFoundException(`Product with ${ term } not found`)
    return product
    //return {...product, images: product.images.map(image => image.url )}    // trae error despues por el cambio de la entidad
    
  }

  // llamada intermedia para obtener la images por separado
  async findOnePlain( term: string ) {
    const { images = [], ...rest} = await this.findOne( term );
    return {
      ...rest,
      images: images.map( image => image.url )
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto ) {

    const product = await this.productRepository.preload({
      id: id,                       // busca por este id
      ...updateProductDto,           // carga todas las propiedades en este updateProductDTO
      images:[]
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
