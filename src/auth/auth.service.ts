import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
//import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(
    // DI
    @InjectRepository( User )
    private readonly userRepository: Repository< User >,

  ) {}

  async create(createUserDto: CreateUserDto) {

    try {

      const user = this.userRepository.create( createUserDto )     // preparar para insertar
      
      await this.userRepository.save( user )

      return user

    } catch (error) {
      //console.log(error)
      this.handleDBErrors(error)
    }

  }

  private handleDBErrors(error: any) : never {          // :never,    no regresa algun valor

    if(error.code === '23505' )
      throw new BadRequestException( error.detail )

    console.log(error)

    throw new InternalServerErrorException('Please check server logs')

  }


  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
