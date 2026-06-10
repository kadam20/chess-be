import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';

import type { Variation } from './Variation.model';

@Entity({ name: 'openings', schema: 'public' })
export class Opening {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    ecoCode!: string;

    @Column({ type: 'text' })
    description!: string;

    @Column()
    isForWhite!: boolean;

    @OneToMany('Variation', 'opening')
    variations!: Variation[];
}
