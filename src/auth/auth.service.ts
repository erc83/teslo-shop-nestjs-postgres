import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
//import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {

  constructor(
    // DI
    @InjectRepository( User )
    private readonly userRepository: Repository< User >,

  ) {}

  async create(createUserDto: CreateUserDto) {

    try {
      const { password, ...userData } = createUserDto

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10)
      })     // preparar para insertar
      
      await this.userRepository.save( user )
      
      delete user.password

      return user
      // TODO: retornar el JWT de acceso

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

  async login(loginUserDto: LoginUserDto) {

    const { password, email } = loginUserDto

    // const user = await this.userRepository.findOneBy({ email })  // pro y contra me trae todo
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true}
    })

    if( !user )
      throw new UnauthorizedException('Credentials are not valid (email)')
    
    if( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)')

    return user
    //TODO: retornar el JWT

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
