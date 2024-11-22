import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
export declare const getMongoDbConfig: (configService: ConfigService) => Promise<MongooseModuleOptions>;
