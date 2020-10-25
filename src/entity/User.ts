import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128 })
    firstName: string;

    @Column({ length: 128 })
    lastName: string;

    @Column()
    age: number;
}
