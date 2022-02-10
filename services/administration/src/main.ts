import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { getConnection } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:9092'],
        },
        consumer: {
          groupId: 'administration-service',
        },
      },
    },
  );
  await app.init();
  const connection = getConnection();
  await connection.runMigrations();
  await app.listen();
}
bootstrap();
