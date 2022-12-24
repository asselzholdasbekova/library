import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";
import { Book } from "./books.entity";
import { CreateBookDto } from "./dto/create-book.dto";

@ApiTags('Books')
@Controller('books')
export class BooksController {

    constructor(private booksService) {}

    @ApiOperation({ summary: 'Returns all books' })
    @ApiResponse({ status: 200, type: [Book] })
    @Get()
    getAll() {
        return this.booksService.getAll();
    }

    @ApiOperation({ summary: 'Returns a book by id' })
    @ApiResponse({ status: 200, type: Book })
    @Get(':id')
    getById(@Param('id') id: number) {
        return this.booksService.getById(id);
    }

    @ApiOperation({ summary: 'Creates new book' })
    @ApiResponse({ status: 200, type: Book })
    @Post()
    create(@Body() dto: CreateBookDto) {
        return this.booksService.create(dto);
    }

    @ApiOperation({ summary: 'Updates the book' })
    @ApiResponse({ status: 200, type: Book })
    @Patch(':id')
    update(
        @Param('id') id: number, 
        @Body() dto: CreateBookDto) {
        return this.booksService.update(id, dto);
    }

    @ApiOperation({ summary: 'Deletes the book' })
    @ApiResponse({ status: 200, type: DeleteResult })
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.booksService.delete(id);
    }

}