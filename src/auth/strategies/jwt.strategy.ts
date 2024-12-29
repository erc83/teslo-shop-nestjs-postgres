import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { JwtPayload } from "../interfaces/jwt.payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";

/* export class JwtStrategy extends PassportStrategy( Strategy ) {
    // por defecto utiliza la validacion interna con la palabra secreta, tmb si ha expirado o no
    //y si el token es valido o no
} */

@Injectable()           // tengo que anclarlo a un modulo como un providers -> auth.module.ts
    // implementacion adicional validacion jwt
export class JwtStrategy extends PassportStrategy( Strategy ) {

    constructor(
        // ID 
        @InjectRepository( User )
        private readonly userRepository: Repository<User>,

        configService: ConfigService            // tmb debemos tener la configuracion de ConfigModule,  en el modulo de auth
    ){
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),   // header auth Bearer token
        })
    }


    // para saber si el usuario es valido o no
    async validate( payload: JwtPayload ): Promise<User> {                 // regresamos una instancia

        // valido payload
        const { id } = payload

        //consultar DB
        const user = await this.userRepository.findOneBy({ id })
        
        if(!user)
            throw new UnauthorizedException('Token not valid')
        
        if( !user.isActive )
            throw new UnauthorizedException('User not authorized, talk with an admin ')
            
        // se añade a la Request
        return user
    }

}
