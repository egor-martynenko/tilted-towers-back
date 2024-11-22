import { ModelType } from '@typegoose/typegoose/lib/types';
export declare class AuthService {
    private readonly UserModel;
    constructor(UserModel: ModelType<UserModel>);
    register(dto: any): Promise<void>;
}
