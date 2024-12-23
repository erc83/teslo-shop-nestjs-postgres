import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [ 
    ConfigModule.forRoot(),         //variables entorno
    SeedModule,
    TypeOrmModule.forRoot({         // un forRoot mas son feature
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,       // +number    se tranforma en numero 
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,         // cargar entidades que se definan poco a poco
      synchronize: true,              // al hacer cambio en la entidades, automaticamente las sincroniza
    }), ProductsModule, CommonModule, 
    FilesModule,        
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '/public'),       // http://localhost:3000/assets/img/1473809-00-A_1_2000.jpg
    }),
  ], 

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
