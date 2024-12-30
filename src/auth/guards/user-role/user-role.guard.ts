import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserRoleGuard implements CanActivate {

  // para que el guard sea valido tiene que implementar el canActivate que devuelve un valor booleano
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    console.log('UserRoleGuard')
    
    //throw new BadRequestException("Provando excepcion con el Guard")

    return true;      // si retorna false no entra en la ruta privada2
  }
}
