import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../books/books.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('User')
export class User {
    
    @ApiProperty({ example: '1', description: 'Unique identificator' })
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example: 'test@mail.com', description: 'Email address' })
    @Column({
        type: 'varchar',
        unique: true,
        nullable: false
    })
    email: string

    @ApiProperty({ example: 'testpass', description: 'Password' })
    @Column({
        type: 'varchar',
        nullable: false
    })
    password: string

    @ApiProperty({ example: 'false', description: 'Subscribed or not' })
    @Column({
        type: 'boolean',
        default: false
    })
    hasSubscription: boolean

    @ApiProperty({ example: '2022-09-01 10:41:46.736774', description: 'Date of user creation' })
    @CreateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)", 
        name: 'created_at' 
    })
    public createdAt: Date;

    @ApiProperty({ example: '2022-09-01 10:41:46.736774', description: 'Date of user update' })
    @UpdateDateColumn({ 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP(6)", 
        onUpdate: "CURRENT_TIMESTAMP(6)", 
        name: 'updated_at' 
    })

    public updatedAt: Date;

    @OneToMany(() => Book, (book) => book.user)
    books: Book[]

}