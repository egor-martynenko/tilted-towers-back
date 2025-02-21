import { prop, Ref } from '@typegoose/typegoose';
import { UserModel } from '../user/user.model';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface MessageModel extends Base {}
export class MessageModel extends TimeStamps {
  @prop({ ref: () => UserModel })
  sender: Ref<UserModel>;

  @prop({ ref: () => UserModel })
  receiver: Ref<UserModel>;

  @prop({ required: true })
  content: string;

  @prop({ default: false })
  isRead: boolean;

  @prop({ default: Date.now })
  createdAt: Date;
}
