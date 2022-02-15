import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

export const KAFKA_HOST = configService.get('KAFKA_HOST');
export const KAFKA_PORT = configService.get<number>('KAFKA_PORT');
export const PG_HOST = configService.get('PG_HOST');
export const PG_USER = configService.get('PG_USER');
export const PG_PASSWORD = configService.get('PG_PASSWORD');
export const PG_DATABASE = configService.get('PG_DATABASE');
export const PG_PORT = configService.get('PG_PORT');
export const SECRET = configService.get('SECRET');
