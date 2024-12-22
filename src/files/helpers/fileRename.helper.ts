//import { Request } from 'express'   // ya lo tenemos de manera global
//import { v4 as uuid } from 'uuid'

export const fileRename = ( req: Express.Request, file: Express.Multer.File, callback: Function ) => {

    //console.log({ file })
    if( !file ) return callback( new Error('File is empty' ), false )           // false no aceptamos el archivo

    console.log(file.mimetype)
    const fileExtension = file.mimetype.split('/')[1]
    const fileName = file.originalname.split('.')[0]

    const fileNameExt = `${ fileName }.${ fileExtension }` // pendiente validacion si existe el archivo en el directorio
    
    //se puede agregar UUID a las imagenes, pero prefiero subir la imagen con el nombre original
    //const fileNameExt = `${ uuid() }.${ fileExtension }`

    callback( null, fileNameExt )
}

