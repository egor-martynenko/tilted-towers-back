import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from '@m8a/nestjs-typegoose';

export const getMongoDbConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => ({
  uri: configService.get<string>('MONGO_URI'),
});
