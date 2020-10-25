import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'datetime' })
    startDate: string;

    @Column({ length: 128 })
    nickName: string;

    @Column()
    age: number;

    get userId(): string {
        return this.nickName + this.id;
    }
}
