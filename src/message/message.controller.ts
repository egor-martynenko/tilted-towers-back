import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageModel } from './message.model';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // Создание нового сообщения
  @Post('send')
  async sendMessage(
    @Body()
    data: {
      chatId: string;
      senderId: string;
      receiverId: string;
      content: string;
    },
  ): Promise<MessageModel> {
    const { chatId, senderId, receiverId, content } = data;
    return this.messageService.addMessage(
      chatId,
      senderId,
      receiverId,
      content,
    );
  }

  // Получение всех сообщений для чата
  @Get('chat/:chatId')
  async getMessagesByChat(
    @Param('chatId') chatId: string,
  ): Promise<MessageModel[]> {
    return this.messageService.getMessagesByChat(chatId);
  }

  // Пометка сообщения как прочитанное
  @Post('mark-as-read')
  async markAsRead(@Body() data: { messageId: string }): Promise<MessageModel> {
    return this.messageService.markAsRead(data.messageId);
  }
}
