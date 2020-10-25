import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128 })
    firstName: string;

    @Column({ length: 128 })
    nickName: string;

    @Column()
    age: number;

    get userId(): string {
        return this.nickName + this.id;
    }
}
