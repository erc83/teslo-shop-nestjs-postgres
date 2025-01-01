import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
//import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt.payload.interface';

@Injectable()
export class AuthService {

  constructor(
    // DI
    @InjectRepository( User )
    private readonly userRepository: Repository< User >,

    private readonly jwtService: JwtService,

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

      //return user
      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      }
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
      select: { email: true, password: true, id: true }
    })

    if( !user )
      throw new UnauthorizedException('Credentials are not valid (email)')
    
    if( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)')

    // return user
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })      // recibe un objeto el payload
    }
  }

  private getJwtToken( payload: JwtPayload) {

    const token = this.jwtService.sign( payload )
    return token

  }

  async checkAuthStatus( user: User ){    // el usuario ya tiene toda la informacion

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }
    
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
