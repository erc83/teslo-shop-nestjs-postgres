import { Reflector } from '@nestjs/core';
import { BadRequestException, CanActivate, ExecutionContext, Injectable } 
  from '@nestjs/common';
import { Observable } from 'rxjs';

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
    
    console.log({ validRoles })

    return true;      // si retorna false no entra en la ruta privada2
  }
}
