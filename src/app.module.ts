/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './shared';
import { AuthModule } from './features/auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(envs.databaseUrl, {
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-delete'), {
          overrideMethods: 'all',
        });
        return connection;
      },
    }),
    AuthModule,
  
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
