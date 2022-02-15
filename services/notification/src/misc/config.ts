import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const KAFKA_HOST = configService.get('KAFKA_HOST');
export const KAFKA_PORT = configService.get('KAFKA_PORT');
