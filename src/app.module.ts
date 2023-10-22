import { Module } from '@nestjs/common';
import { ProductosModule } from './productos/productos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarcasModule } from './marcas/marcas.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriasModule } from './categorias/categorias.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: parseInt(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      ssl: process.env.MYSQL_SSL === "true",
      extra: {
        ssl:
          process.env.MYSQL_SSL === "true"
            ? {
                rejectUnauthorized: false,
              }
            : null,
      },
    }),
    ProductosModule,
    MarcasModule,
    ProveedoresModule,
    UsersModule,
    AuthModule,
    CategoriasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
