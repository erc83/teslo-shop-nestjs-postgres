import { Reflector } from '@nestjs/core';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } 
  from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) {}

  // para que el guard sea valido tiene que implementar el canActivate que devuelve un valor booleano
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const validRoles : string[] = this.reflector.get( 'roles', context.getHandler() )
    
    const req = context.switchToHttp().getRequest()
    const user = req.user as User

    if( !user )
      throw new BadRequestException('User not found')

    //console.log({ userRoles: user.roles })
    for( const role of user.roles ) {
      if( validRoles.includes( role ) ) {
        return true
      }
    }

    //return true;      // si retorna false no entra en la ruta privada2
    throw new ForbiddenException(
      `User ${ user.fullName } need a valid role: [${ validRoles }]`
    )

  }
}
