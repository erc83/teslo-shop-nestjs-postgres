import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";


// funcion
export const GetUser = createParamDecorator(

    ( data: string, ctx: ExecutionContext ) => {
        //console.log(data, 'data')
        //console.log(ctx)

        const req = ctx.switchToHttp().getRequest()
        const user = req.user

        if( !user )
            throw new InternalServerErrorException('User not found (request')

        // si todo esta bien retorno el usuario
        return ( !data ) 
                ? user 
                : user[ data ]
    }

)
