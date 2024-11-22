import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserModel } from '../../user/user.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly UserModel;
    constructor(configService: ConfigService, UserModel: ModelType<UserModel>);
    validate({ _id }: Pick<UserModel, '_id'>): Promise<import("mongoose").Document<unknown, import("@typegoose/typegoose/lib/types").BeAnObject, UserModel> & Omit<UserModel & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, "typegooseName"> & import("@typegoose/typegoose/lib/types").IObjectWithTypegooseFunction>;
}
export {};
