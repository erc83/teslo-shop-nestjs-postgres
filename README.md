<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Description

[Teslo Shop Backend](https://github.com/erc83/teslo-shop-nestjs-postgres) 
Este repositorio contiene el backend de Teslo Shop, una aplicación para la gestión y operación de una tienda de ropa. Está desarrollado utilizando:

- NestJS como framework principal para la construcción de APIs.
- PostgreSQL como base de datos relacional.
- TypeORM para el manejo y la integración con la base de datos.





## Project setup

1. Clonar Proyecto


2. 
```bash
$ yarn install
```

3. Clonar el archivo ```.env.template``` y renombrarlo a ```.env``

4. Cambiar las variables de entorno

5.- Levantar base de datos postgres

```
docker-compose up -d
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```


