import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('Book')
export class Book {
    
    @ApiProperty({ example: '1', description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 'The Great Gatsby', description: 'Name of the book' })
    @Column({
        type: 'varchar',
        nullable: false
    })
    name: string

    @ApiProperty({ example: 'F. Scott Fitzgerald', description: 'Author of the book' })
    @Column({
        type: 'varchar',
        nullable: false
    })
    author: string

    @ApiProperty({ example: '1925', description: 'Year of publishment' })
    @Column({
        type: 'integer'
    })
    year: number

    @ManyToOne(() => User, (user) => user.books)
    user: User

}