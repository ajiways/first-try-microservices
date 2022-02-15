import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { getConnection } from "typeorm";
import { MARKET_SERVICE } from "./misc/constants";
import { KAFKA_HOST, KAFKA_PORT } from "./misc/config";

async function bootstrap() {
   const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
         client: {
            brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`],
         },
         consumer: {
            groupId: MARKET_SERVICE,
         },
      },
   });
   await app.listen();
}
bootstrap();
