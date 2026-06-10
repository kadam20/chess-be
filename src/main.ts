import logger from 'jet-logger';
import 'reflect-metadata';

import EnvVars from './common/constants/env';
import { initializeDb } from './db';
import server from './server';

const SERVER_START_MESSAGE =
    'Express server started on port: ' + EnvVars.Port.toString();

async function main() {
    try {
        await initializeDb();
        logger.info('Database connected');

        server.listen(EnvVars.Port, (err) => {
            if (!!err) {
                logger.err(err.message);
            } else {
                logger.info(SERVER_START_MESSAGE);
            }
        });
    } catch (err) {
        logger.err('Failed to start server');
        if (err instanceof Error) {
            logger.err(err.message);
        }
        process.exit(1);
    }
}

void main();
