import {
    IsPositive, IsString, MinLength, IsNumber,
    IsOptional, IsInt, IsArray, IsIn
} from "class-validator"

export class CreateProductDto {

    @IsString()
    @MinLength(1)
    title: string

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number
    
    @IsString()
    @IsOptional()
    description?: string
    
    @IsString()
    @IsOptional()
    slug?: string

    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number

    @IsString({ each: true })
    @IsArray()
    sizes: string[]

    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender: string

    @IsString({each: true})
    @IsArray()
    @IsOptional()               // Si no se envia termina siendo un arreglo vacio
    tags: string[]
    
    @IsString({each: true})
    @IsArray()
    @IsOptional()
    images?: string[]           // puede que venga o no

}
