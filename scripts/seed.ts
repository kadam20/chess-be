import 'reflect-metadata';

import logger from 'jet-logger';

import { AppDataSource, initializeDb } from '@src/db';
import { Opening } from '@src/models/Opening.model';
import { Variation } from '@src/models/Variation.model';

import {
    buildLondonVariationSeeds,
    LONDON_OPENING_SEED,
} from './london-opening.seed';

async function seedLondonOpening(): Promise<void> {
    await initializeDb();

    const openingRepo = AppDataSource.getRepository(Opening);
    const variationRepo = AppDataSource.getRepository(Variation);

    const existing = await openingRepo.findOne({
        where: { name: LONDON_OPENING_SEED.name },
    });

    if (existing) {
        await openingRepo.remove(existing);
        logger.info(
            `Removed existing "${LONDON_OPENING_SEED.name}" opening before re-seeding`,
        );
    }

    const opening = openingRepo.create({
        name: LONDON_OPENING_SEED.name,
        ecoCode: LONDON_OPENING_SEED.ecoCode,
        description: LONDON_OPENING_SEED.description,
        isForWhite: LONDON_OPENING_SEED.isForWhite,
    });

    const savedOpening = await openingRepo.save(opening);

    const variationSeeds = buildLondonVariationSeeds();
    const variations = variationSeeds.map(({ name, moves }) =>
        variationRepo.create({
            name,
            moves,
            opening: savedOpening,
        }),
    );

    await variationRepo.save(variations);

    logger.info(
        `Seeded "${savedOpening.name}" with ${variations.length} variations`,
    );
}

seedLondonOpening()
    .then(async () => {
        await AppDataSource.destroy();
        process.exit(0);
    })
    .catch(async (err: unknown) => {
        logger.err('Seed failed');
        if (err instanceof Error) {
            logger.err(err.message);
        }
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
        process.exit(1);
    });
