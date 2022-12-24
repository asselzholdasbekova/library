import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class CreateBookDto {

    @ApiProperty({ example: 'The Great Gatsby', description: 'Name of the book' })
    @IsString({ message: 'Email should be a string!' })
    readonly name: string;

    @ApiProperty({ example: 'F. Scott Fitzgerald', description: 'Author of the book' })
    @IsString({ message: 'Password should be a string!' })
    readonly author: string;

    @ApiProperty({ example: '1925', description: 'Year publishment' })
    @IsNumber()
    readonly year: number;
    
}