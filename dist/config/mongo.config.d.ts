import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from '@m8a/nestjs-typegoose';
export declare const getMongoDbConfig: (configService: ConfigService) => Promise<TypegooseModuleOptions>;
