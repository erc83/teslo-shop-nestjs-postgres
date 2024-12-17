import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ProductImage {

    @PrimaryGeneratedColumn('increment')   // sin el nombre por defecto es increment
    id: number

    @Column('text')
    url: string

}
