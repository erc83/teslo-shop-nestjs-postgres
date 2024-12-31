import { Reflector } from '@nestjs/core';
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } 
  from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/auth/entities/user.entity';
import { META_ROLES } from 'src/auth/decorators/role-protected/role-protected.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) {}

  // para que el guard sea valido tiene que implementar el canActivate que devuelve un valor booleano
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // Obtener los roles permitidos de los metadatos
    //const validRoles : string[] = this.reflector.get( META_ROLES , context.getHandler() )
    const requiredRoles = this.reflector.get<ValidRoles[]>(META_ROLES, context.getHandler())
    
    if(!requiredRoles || requiredRoles.length === 0) {
      console.log("No hay roles en el usuario o la ruta no solicita roles")
      return false;   // bloqueo de acceso si no hay roles especificados
    }

    // Obtener el usuario desde la solicitud
    const req = context.switchToHttp().getRequest()
    const user = req.user as User

    if( !user || !user.roles ) {
      throw new BadRequestException('User not found')
      //return false;
    }

    //console.log(user, 'user-role.guard,ts')
    // Verificar que el usuario tenga todos los roles requeridos
    
    return requiredRoles.every( role => user.roles.includes( role ))

  }
}
