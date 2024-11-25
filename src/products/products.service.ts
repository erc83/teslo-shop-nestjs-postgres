import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  
  constructor(
    // DI
    @InjectRepository( Product )  // no solo para insertar, tb para query builder, transacciones, rollback
    private readonly productRepository: Repository< Product > 

  ){}
  
  async create(createProductDto: CreateProductDto) {
    
    try {
      // insertar
      const product = this.productRepository.create( createProductDto ) // crea la instancia del producto con sus propiedades en memoria

      // guardar base datos
      await this.productRepository.save( product )
      
      return product
      
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Ayuda!')
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
}
