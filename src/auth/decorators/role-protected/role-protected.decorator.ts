import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from '../../interfaces/valid-roles';

export const META_ROLES = 'roles'

//export const RoleProtected = (...args: string[]) => { // recibe un arreglo de string
export const RoleProtected = (...args: ValidRoles[]) => { // recibe un arreglo de string



    return SetMetadata( META_ROLES , args);         // el arreglo de string lo establece en la metadata
}
