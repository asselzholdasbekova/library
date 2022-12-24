import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/users.entity";
import { UserModule } from "./users/users.module";
import { BooksModule } from './books/books.module';
import { Book } from "./books/books.entity";

@Module({
    exports: [],
    providers: [],
    controllers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [User, Book],
            synchronize: true,
            autoLoadEntities: true
        }),
        UserModule,
        BooksModule,
    ],
})
export class AppModule {}