import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ADMINISTRATION_SERVICE } from './misc/constants';
import { KAFKA_HOST, KAFKA_PORT } from './misc/service';

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
          groupId: ADMINISTRATION_SERVICE,
        },
      },
    },
  );
  await app.init();
  await app.listen();
}
bootstrap();
