import { AppDataSource } from '@src/db';
import { Opening } from '@src/models/Opening.model';
import { Variation } from '@src/models/Variation.model';
import {
    IVariationInput,
    IVariationUpdate,
} from '@src/models/Variation.schema';

/******************************************************************************
                                Functions
******************************************************************************/

function getRepo() {
    return AppDataSource.getRepository(Variation);
}

async function getAll(): Promise<Variation[]> {
    return getRepo().find({ relations: { opening: true } });
}

async function getOne(id: string): Promise<Variation | null> {
    return getRepo().findOne({
        where: { id },
        relations: { opening: true },
    });
}

async function persists(id: string): Promise<boolean> {
    const count = await getRepo().count({ where: { id } });
    return count > 0;
}

async function add(
    input: IVariationInput,
    opening: Opening,
): Promise<Variation> {
    const variation = getRepo().create({
        name: input.name,
        moves: input.moves,
        opening,
    });
    return getRepo().save(variation);
}

async function update(
    input: IVariationUpdate,
    opening: Opening,
): Promise<void> {
    await getRepo().save({
        id: input.id,
        name: input.name,
        moves: input.moves,
        opening,
    });
}

async function delete_(id: string): Promise<void> {
    await getRepo().delete(id);
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
    getAll,
    getOne,
    persists,
    add,
    update,
    delete: delete_,
} as const;
