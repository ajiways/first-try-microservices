import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { ConfigModule } from "@nestjs/config";
import { OrderModule } from "./modules/order/order.module";
import { typeOrmConfigAsync } from "./config/typeorm";

@Module({
   imports: [
      TypeOrmModule.forRootAsync(typeOrmConfigAsync),
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      OrderModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {
   constructor(private connection: Connection) {}
}
