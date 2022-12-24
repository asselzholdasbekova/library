import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "./books.entity";
import { CreateBookDto } from "./dto/create-book.dto";

@Injectable()
export class BooksService {

    constructor(@InjectRepository(Book) private booksRepository: Repository<Book>) {}

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

}