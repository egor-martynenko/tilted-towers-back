import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMongoDbConfig } from './config/mongo.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { AccountModule } from './account/account.module';
import { FileModule } from './file/file.module';
import { SocketService } from './socket/socket.gateway';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDbConfig,
    }),
    AuthModule,
    UserModule,
    AccountModule,
    FileModule,
    ChatModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketService],
})
export class AppModule {}
