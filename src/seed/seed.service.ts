import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data-product';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
//import { ProductsService } from './../products/products.service';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService,

    @InjectRepository( User )
    private readonly userRepository: Repository< User >
  ){}

  async runSeed() {
    // antes de crear elimino los datos de la tabla
    await this.deleteTables()

    const AdminUser = await this.insertUsers()

    await this.insertNewProducts( AdminUser )
    return `SEED EXECUTED`
  }

  private async insertUsers() {
    const seedUsers = initialData.users

    const users: User[] = []

    // guardar varios user con diferentes roles
    seedUsers.forEach( user => {
      users.push( this.userRepository.create( user ))
    })

    // guardan en la base de datos
    const dbUsers = await this.userRepository.save( seedUsers )

    // return users[0]      // llega sin el id y nos arroja error
    return dbUsers[0]


  }


  private async deleteTables() {

    await this.productsService.deleteAllProducts()

    const queryBuilder = this.userRepository.createQueryBuilder()
    await queryBuilder
            .delete()
            .where({})
            .execute()
  }



  private async insertNewProducts( user: User ) {
    await this.productsService.deleteAllProducts()

    // llamamos el metodo create
    const products = initialData.products

    const insertPromises = []
  
    products.forEach( product => {
      //this.productsService.create( product )
      insertPromises.push( this.productsService.create( product, user  ) )
    })

    await Promise.all( insertPromises )  

    return true
  }


}
