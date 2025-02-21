import { Injectable } from '@nestjs/common';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { ChatModel } from '../chat/chat.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { MessageModel } from './message.model';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(MessageModel)
    private readonly MessageModel: ModelType<MessageModel>,

    @InjectModel(ChatModel)
    private readonly ChatModel: ModelType<ChatModel>,
  ) {}

  async addMessage(
    chatId: string,
    senderId: string,
    receiverId: string,
    content: string,
  ): Promise<MessageModel> {
    const message = new this.MessageModel({
      sender: senderId,
      receiver: receiverId,
      content,
      isRead: false,
      createdAt: new Date(),
    });
    const savedMessage = await message.save();
    await this.ChatModel.findByIdAndUpdate(chatId, {
      $push: { messages: savedMessage._id },
    });
    return savedMessage;
  }

  async getMessagesByChat(chatId: string): Promise<MessageModel[]> {
    const chat = await this.ChatModel.findById(chatId).populate('messages');
    if (!chat) {
      throw new Error('Chat not found');
    }
    return chat.messages;
  }

  async markAsRead(messageId: string): Promise<MessageModel> {
    const message = await this.MessageModel.findByIdAndUpdate(
      messageId,
      { isRead: true },
      { new: true },
    );
    if (!message) {
      throw new Error('Message not found');
    }
    return message;
  }
}
