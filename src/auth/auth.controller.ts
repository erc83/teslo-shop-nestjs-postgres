import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
//import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { RawHeaders } from 'src/common/decorator/raw-headers.decorator';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { META_ROLES, RoleProtected } from './decorators/role-protected/role-protected.decorator';
import { ValidRoles } from './interfaces/valid-roles';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login( loginUserDto)
  }

  @Get('private')
  @UseGuards( AuthGuard() )
  async testingPrivateRoute(
    //@Req() request: Express.Request
    //@GetUser(['email', 'password']) user: User     // -> con un array se obtienen todos los valores
    @GetUser() user: User,
    @GetUser('email') userEmail: string,

    @RawHeaders() rawHeaders : string[],
    @Headers() headers: IncomingHttpHeaders,        // decorador ya implementado
  ) {
    //console.log({ user: request.user })      // en la request tenemos el usuario
    console.log({ user })

    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      userEmail,
      rawHeaders,
      headers
    }
  }
  
  
  
  
  //@SetMetadata( 'roles' , ['admin', 'moderador'])
  
  @Get('private2')
  //@RoleProtected()                    -> creo un arreglo vacio de roles y cualquiera puede ingresar a los servicios
  @RoleProtected(ValidRoles.user)          
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute2(
    @GetUser() user: User 
  ){
    return {
      ok: true,
      user
    }
  }

  @Get('private_user_moderador')
  @RoleProtected(ValidRoles.user, ValidRoles.moderador)          
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute3(
    @GetUser() user: User 
  ){
    return {
      ok: true,
      message: 'respuesta a usuario con rol de user y moderador', // necesita ambos roles para poder ingresar
      user
    }
  }

  @Get('private_moderador_admin')
  @RoleProtected(ValidRoles.admin, ValidRoles.moderador)  // el user necesita rol de admin y moderador
  @UseGuards( AuthGuard(), UserRoleGuard )
  privateRoute4(
    @GetUser() user: User 
  ){
    return {
      ok: true,
      message: 'respuesta a usuario con rol de admin y moderador',
      user
    }
  }


  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
