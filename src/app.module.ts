import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ 
    ConfigModule.forRoot(),         //variables entorno

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
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
