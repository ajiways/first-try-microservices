import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { PG_DATABASE, PG_HOST, PG_PASSWORD, PG_PORT, PG_USER } from "../misc/config";

export function getOrmConfig(): TypeOrmModuleOptions {
   return {
      type: "postgres",
      host: PG_HOST,
      port: PG_PORT,
      username: PG_USER,
      password: PG_PASSWORD,
      database: PG_DATABASE,
      namingStrategy: new SnakeNamingStrategy(),
      entities: [join(__dirname, "..", "/modules", "/**", "/*.entity.{ts,js}")],
      synchronize: false,
      migrations: [join(__dirname, "..", "/migrations", "/*.{ts,js}")],
      migrationsTableName: "migrations",
      migrationsRun: true,
      logging: "all",
      cli: {
         migrationsDir: join(__dirname, "..", "/migrations"),
      },
   };
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
   useFactory: async (): Promise<TypeOrmModuleOptions> => getOrmConfig(),
};
