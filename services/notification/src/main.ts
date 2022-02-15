import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_HOST, KAFKA_PORT } from './misc/config';
import { NOTIFICATION_SERVICE } from './misc/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
        },
        consumer: {
          groupId: NOTIFICATION_SERVICE,
        },
      },
    },
  );
  await app.init();
  await app.listen();
}
bootstrap();
