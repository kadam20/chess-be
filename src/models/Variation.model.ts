import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import type { Opening } from './Opening.model';

@Entity({ name: 'variations', schema: 'public' })
export class Variation {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column({ type: 'text' })
    moves!: string;

    @ManyToOne('Opening', 'variations', {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'opening_id' })
    opening!: Opening;
}
