import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { config } from "dotenv";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { getConnection } from "typeorm";
config();

async function bootstrap() {
   const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
         client: {
            brokers: ["kafka:9092"],
         },
         consumer: {
            groupId: "market-service",
         },
      },
   });
   const connection = getConnection();
   await connection.runMigrations();
   await app.listen();
}
bootstrap();
