import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from "./users.contoller";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

@Module({
    exports: [UsersService],
    providers: [UsersService],
    controllers: [UsersController],
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
})
export class UserModule {}