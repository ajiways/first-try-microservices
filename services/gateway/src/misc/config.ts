import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

export const configService = new ConfigService();

export const PORT = configService.get('PORT');
export const KAFKA_HOST = configService.get('KAFKA_HOST');
export const KAFKA_PORT = configService.get('KAFKA_PORT');
