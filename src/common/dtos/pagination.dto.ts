import { Type } from 'class-transformer'
import { IsOptional, IsPositive, Min } from 'class-validator'


export class PaginationDto {

    @IsOptional()
    @IsPositive()
    // tambien tenemos una forma de tranaformar la data
    @Type( () => Number )
    limit?: number
    
    @IsOptional()
    @IsPositive()
    @Min(0)
    @Type( () => Number )   // tranforma el string del param a Number
    offset?: number

}