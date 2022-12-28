import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/users.entity";
import { Repository } from "typeorm";
import { Book } from "./books.entity";
import { AssignBookDto } from "./dto/assign-book.dto";
import { CreateBookDto } from "./dto/create-book.dto";
import { SubscribeUserDto } from "src/users/dto/subscribe-user.dto";

@Injectable()
export class BooksService {

    constructor(
        @InjectRepository(Book) private booksRepository: Repository<Book>,
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    async getById(id: number) {
        const book = this.booksRepository.findOne({ where: { id } });

        return book;
    }

    async getAll() {
        const books = this.booksRepository.find();

        return books;
    }

    async create(dto: CreateBookDto) {
        const book = await this.booksRepository.save(dto);

        return book;
    }

    async update(
        id: number,
        dto: CreateBookDto
    ) {
        const bookToUpdate = await this.getById(id);
        if(!bookToUpdate) {
            throw new HttpException('Book not found!', HttpStatus.NOT_FOUND);
        }
        const book = await this.booksRepository.update(id, dto);
        
        return book;
    }

    async delete(id: number) {
        const bookToDelete = await this.getById(id);
        if(!bookToDelete) {
            throw new HttpException('Book not found!', HttpStatus.NOT_FOUND);
        }

        return this.booksRepository.delete(id);
    }

    async assign(id: number, dto: AssignBookDto) {
        console.log(dto);
        const book = await this.getById(id);
        const user = await this.usersRepository.findOne({ where: { id: dto.userId} });

        console.log(user);
        if (!user.books) {
            user.books = [];
        }
        if((user.books.length > 5 && !book.user) || !user.hasSubscription) {
            console.log('Error');
            return book;
        }
        user.books.push(book);
        await this.booksRepository.save(book);
        await this.usersRepository.save(user);

        return book;
    }

    async freeUp(id: number) {
        const book = await this.getById(id);
        book.user = null;
        await this.booksRepository.save(book);

        return book;
    }

}