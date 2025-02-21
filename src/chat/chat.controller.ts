import { Controller, Get, Post, Param, Body, Patch } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('create')
  async createChat(@Body() body: { userId: string; adminId: string }) {
    return this.chatService.createChat(body.userId, body.adminId);
  }

  @Get(':chatId/messages')
  async getChatMessages(@Param('chatId') chatId: string) {
    return this.chatService.getChatMessages(chatId);
  }

  @Patch(':chatId/close')
  async closeChat(@Param('chatId') chatId: string) {
    return this.chatService.closeChat(chatId);
  }

  @Patch(':chatId/reassign')
  async reassignChat(@Param('chatId') chatId: string) {
    return this.chatService.reassignChat(chatId);
  }

  @Get('admin/:adminId')
  async getAdminChats(@Param('adminId') adminId: string) {
    return this.chatService.getAdminChats(adminId);
  }

  @Get(':userId')
  async getUserChat(@Param('userId') userId: string) {
    return this.chatService.getUserChat(userId);
  }
}
