import { Injectable } from '@nestjs/common';
import { InjectModel } from '@m8a/nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { ChatModel } from './chat.model';
import { MessageModel } from '../message/message.model';
import { UserModel } from '../user/user.model';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatModel)
    private readonly ChatModel: ModelType<ChatModel>,
    @InjectModel(MessageModel)
    private readonly MessageModel: ModelType<MessageModel>,
    @InjectModel(UserModel)
    private readonly UserModel: ModelType<UserModel>,
  ) {}
  async createChat(userId: string, adminId: string): Promise<ChatModel> {
    return await this.ChatModel.create({
      user: userId,
      admin: adminId,
      status: 'active',
      messages: [],
    });
  }
  async createOrFindChat(
    senderId: string,
    receiverId: string,
  ): Promise<string> {
    const chat = await this.ChatModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (chat) {
      return chat._id.toString(); // Преобразуем ObjectId в строку
    }

    const newChat = new this.ChatModel({
      participants: [senderId, receiverId],
    });

    const savedChat = await newChat.save();
    return savedChat._id.toString(); // Преобразуем ObjectId в строку
  }

  async getUserChat(userId: string): Promise<ChatModel> {
    return this.ChatModel.findOne({
      user: userId,
      status: 'active',
    }).populate('messages');
  }

  async addMessage(
    chatId: string,
    senderId: string,
    receiverId: string,
    content: string,
  ): Promise<MessageModel> {
    const message = await this.MessageModel.create({
      sender: senderId,
      receiver: receiverId,
      content,
      isRead: false,
      createdAt: new Date(),
    });

    await this.ChatModel.findByIdAndUpdate(chatId, {
      $push: { messages: message._id },
    });

    return message;
  }

  async getChatMessages(chatId: string): Promise<MessageModel[]> {
    const chat = await this.ChatModel.findById(chatId).populate({
      path: 'messages',
      populate: { path: 'sender receiver', select: 'email' },
    });

    return chat?.messages || [];
  }

  async assignAdminToChat(chatId: string): Promise<void> {
    const admin = await this.UserModel.find({ isAdmin: true })
      .sort({ activeChatsCount: 1 })
      .limit(1)
      .exec();

    if (!admin || admin.length === 0) {
      throw new Error('No available administrators');
    }

    await this.ChatModel.findByIdAndUpdate(chatId, { admin: admin[0]._id });
  }

  async reassignChat(chatId: string): Promise<void> {
    const chat = await this.ChatModel.findById(chatId);
    const newAdmin = await this.UserModel.find({
      isAdmin: true,
      _id: { $ne: chat.admin },
      lastActive: { $gte: Date.now() - 15 * 60 * 1000 },
    })
      .sort({ activeChatsCount: 1 })
      .limit(1)
      .exec();

    if (!newAdmin || newAdmin.length === 0) {
      throw new Error('No available administrators to reassign the chat');
    }

    chat.admin = newAdmin[0]._id;
    await chat.save();
  }

  async closeChat(chatId: string): Promise<ChatModel> {
    return this.ChatModel.findByIdAndUpdate(
      chatId,
      {
        status: 'closed',
        closedAt: new Date(),
      },
      { new: true },
    );
  }

  async updateAdminChatCount(adminId: string) {
    const count = await this.ChatModel.countDocuments({
      admin: adminId,
      status: 'active',
    });
    await this.UserModel.findByIdAndUpdate(adminId, {
      activeChatsCount: count,
    });
  }

  async getAdminChats(adminId: string): Promise<ChatModel[]> {
    return this.ChatModel.find({
      admin: adminId,
      status: 'active',
    }).populate('messages');
  }
}
