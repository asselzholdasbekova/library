import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddBookDto } from "./dto/add-book.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { SubscribeUserDto } from "./dto/subscribe-user.dto";
import { User } from "./users.entity";

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

    async getById(id: number) {
        const user = this.usersRepository.findOne({ where: { id }, relations: { books: true } });

        return user;
    }

    async getByEmail(email: string) {
        const user = this.usersRepository.findOne({ where: { email } });

        return user;
    }

    async getAll() {
        const users = this.usersRepository.find();

        return users;
    }

    async create(dto: CreateUserDto) {
        const user = await this.usersRepository.save(dto);

        return user;
    }

    async update(
        id: number,
        dto: CreateUserDto
    ) {
        const userToUpdate = await this.getById(id);
        if(!userToUpdate) {
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
        }
        const user = await this.usersRepository.update(id, dto);
        
        return user;
    }

    async delete(id: number) {
        const userToDelete = await this.getById(id);
        if(!userToDelete) {
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
        }

        return this.usersRepository.delete(id);
    }

    async subscribe(dto: SubscribeUserDto) {
        const user = await this.usersRepository.findOne({ where: { id: dto.userId } })
        if(!user) {
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
        }
        user.hasSubscription = true;
        await this.usersRepository.save(user);
        
        return user;
    }

    async unsubscribe(dto: SubscribeUserDto) {
        const user = await this.usersRepository.findOne({ where: { id: dto.userId } })
        if(!user) {
            throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
        }
        user.hasSubscription = false;
        await this.usersRepository.save(user);
        
        return user;
    }

    async addBook(dto: AddBookDto) {}

    async returnBook(dto: AddBookDto) {}

}