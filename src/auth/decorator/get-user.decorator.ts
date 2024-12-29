import { createParamDecorator } from "@nestjs/common";


// funcion
export const GetUser = createParamDecorator(

    () => {

        // lo que retorne va a regresar donde sea llamado
        return 'Hola Mundo'
    }

)
