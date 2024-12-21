import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";


@Entity({ name: 'products_images'})
export class ProductImage {

    @PrimaryGeneratedColumn('increment')   // sin el nombre por defecto es increment
    id: number

    @Column('text')
    url: string

    @ManyToOne(
        () => Product,
        ( product ) => product.images, 
        { onDelete: 'CASCADE'}              // para eliminar en cascada cuando se elimina una imagen
    )
    product: Product

}
