//import { Request } from 'express'   // ya lo tenemos de manera global

export const fileFilter = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {

    console.log({ file })
    if( !file ) return callback( new Error('File is empty' ), false )           // false no aceptamos el archivo

    const fileExtension = file.mimetype.split('/')[1]

    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'avif']

    // validacion aceptar el archivo
    if( validExtensions.includes( fileExtension )) {
        return callback( null, true )
    }

    return callback( null, false )
}

