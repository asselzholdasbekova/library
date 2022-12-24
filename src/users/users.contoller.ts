import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SubscribeUserDto } from "./dto/subscribe-user.dto";
import { DeleteResult } from "typeorm";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({ summary: 'Returns all users' })
    @ApiResponse({ status: 200, type: [User] })
    @Get()
    getAll() {
        return this.usersService.getAll();
    }

    @ApiOperation({ summary: 'Returns a user by id' })
    @ApiResponse({ status: 200, type: User })
    @Get(':id')
    getById(@Param('id') id: number) {
        return this.usersService.getById(id);
    }

    @ApiOperation({ summary: 'Creates new user' })
    @ApiResponse({ status: 200, type: User })
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @ApiOperation({ summary: 'Updates the user' })
    @ApiResponse({ status: 200, type: User })
    @Patch(':id')
    update(
        @Param('id') id: number, 
        @Body() dto: CreateUserDto) {
        return this.usersService.update(id, dto);
    }

    @ApiOperation({ summary: 'Deletes the user' })
    @ApiResponse({ status: 200, type: DeleteResult })
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.usersService.delete(id);
    }

    @ApiOperation({ summary: 'Gives a subscription to the user' })
    @ApiResponse({ status: 200, type: User })
    @Post('subscribe')
    subscribe(@Body() dto: SubscribeUserDto) {
        return this.usersService.subscribe(dto);
    }

    @ApiOperation({ summary: 'Removes a subscription from the user' })
    @ApiResponse({ status: 200, type: User })
    @Post('unsubscribe')
    unsubscribe(@Body() dto: SubscribeUserDto) {
        return this.usersService.unsubscribe(dto);
    }

}