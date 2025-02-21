import { Module } from '@nestjs/common';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { ChatModel } from './chat.model';
import { ConfigModule } from '@nestjs/config';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MessageModel } from '../message/message.model';
import { UserModel } from '../user/user.model';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: ChatModel,
        schemaOptions: {
          collection: 'Chat',
        },
      },
      {
        typegooseClass: MessageModel,
        schemaOptions: {
          collection: 'Message',
        },
      },
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),
    MessageModule,
    ConfigModule,
  ],
  providers: [ChatService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
