import { prop, Ref } from '@typegoose/typegoose';
import { UserModel } from '../user/user.model';
import { MessageModel } from '../message/message.model';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface ChatModel extends Base {}
export class ChatModel extends TimeStamps {
  @prop({ ref: () => UserModel, required: true })
  user: Ref<UserModel>;

  @prop({ ref: () => UserModel })
  admin: Ref<UserModel>;

  @prop({ ref: () => MessageModel, default: [] })
  messages: MessageModel[];

  @prop({ default: 'active' })
  status: 'active' | 'closed';

  @prop({ default: Date.now })
  createdAt: Date;

  @prop()
  closedAt?: Date;
}
