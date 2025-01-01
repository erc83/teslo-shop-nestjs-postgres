import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data-product';
//import { ProductsService } from './../products/products.service';

@Injectable()
export class SeedService {

  constructor(
    private readonly productsService: ProductsService
  ){}

  async runSeed() {
    await this.insertNewProducts()
    return `SEED EXECUTED`
  }

  private async insertNewProducts() {
    await this.productsService.deleteAllProducts()

    // llamamos el metodo create
    const products = initialData.products

    const insertPromises = []
  
    //products.forEach( product => {
    //  //this.productsService.create( product )
    //  insertPromises.push( this.productsService.create( product ) )
    //})

    await Promise.all( insertPromises )  

    return true
  }


}
