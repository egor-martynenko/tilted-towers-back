import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageModel } from './message.model';
import { ChatModel } from '../chat/chat.model';
import { TypegooseModule } from '@m8a/nestjs-typegoose';
import { UserModel } from '../user/user.model';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MessageModel,
        schemaOptions: {
          collection: 'Message', // Коллекция для сообщений
        },
      },
      {
        typegooseClass: ChatModel,
        schemaOptions: {
          collection: 'Chat',
        },
      },
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User',
        },
      },
    ]),
  ],
  providers: [MessageService],
  controllers: [MessageController],
  exports: [TypegooseModule],
})
export class MessageModule {}
