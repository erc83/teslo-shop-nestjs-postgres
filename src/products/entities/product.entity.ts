import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, OneToMany} from "typeorm";
import { ProductImage } from "./product-image.entity";


@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;                         // defecto number

    @Column('text', { unique: true,} )
    title: string;
    
    @Column('float', { default: 0 })
    price: number;

    // otra forma de crear la columna
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;
    
    @Column('text', { unique: true })
    slug: string;
    
    @Column('int', { default: 0 })
    stock: number;

    // arreglo de string
    @Column('text', { array: true })
    sizes: string[];

    @Column('text')
    gender: string;

    @Column({
        type: 'text',
        array: true,
        default:[]
    })
    // @Column('text', { array: true, default:[] })        -> forma corta
    tags: string[];

    //images
    @OneToMany(
        () => ProductImage,                         //Regresa un ProductImage
        (productImage) => productImage.product, 
        { cascade: true, eager: true  }             // con usar find*  llama la relacion de las imagens para el getProductById
    )
    images?: ProductImage[]             //coleccion de imagenes

    @BeforeInsert()
    checkSlugInsert() {
        if( !this.slug ) {                      // hace referencia a la instancia de mi identidad
            this.slug = this.title
            //createProductDto.slug = createProductDto.title
            //.toLowerCase()
            //.replaceAll(' ','_')
            //.replaceAll("'",'')
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }

}
