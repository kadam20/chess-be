import 'reflect-metadata';
import { DataSource } from 'typeorm';

import EnvVars from '@src/common/constants/env';
import { Opening } from '@src/models/Opening.model';
import { Variation } from '@src/models/Variation.model';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: EnvVars.DbHost,
    port: EnvVars.DbPort,
    username: EnvVars.DbUser,
    password: EnvVars.DbPassword,
    database: EnvVars.DbName,
    schema: 'public',
    synchronize: EnvVars.NodeEnv === 'development',
    logging: EnvVars.NodeEnv === 'development',
    entities: [Opening, Variation],
});

export async function initializeDb(): Promise<DataSource> {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource;
}
