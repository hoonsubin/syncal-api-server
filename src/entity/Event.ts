import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 128 })
    name: string;

    @Column()
    startDate: string; // unix timestamp in seconds

    @Column()
    duration: string; // unix timestamp in seconds (range)

    @Column()
    comments: string;
}
