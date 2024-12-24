import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    email:string

    password: string

    fullName: string

    isActive: boolean

    roles: string[]
}
