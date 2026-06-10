import { AppDataSource } from '@src/db';
import { Opening } from '@src/models/Opening.model';
import { IOpeningInput, IOpeningUpdate } from '@src/models/Opening.schema';

/******************************************************************************
                                Functions
******************************************************************************/

function getRepo() {
    return AppDataSource.getRepository(Opening);
}

async function getAll(): Promise<Opening[]> {
    return getRepo().find({ relations: { variations: true } });
}

async function getOne(id: string): Promise<Opening | null> {
    return getRepo().findOne({
        where: { id },
        relations: { variations: true },
    });
}

async function persists(id: string): Promise<boolean> {
    const count = await getRepo().count({ where: { id } });
    return count > 0;
}

async function add(input: IOpeningInput): Promise<Opening> {
    const opening = getRepo().create(input);
    return getRepo().save(opening);
}

async function update(input: IOpeningUpdate): Promise<void> {
    await getRepo().update(input.id, {
        name: input.name,
        ecoCode: input.ecoCode,
        description: input.description,
        isForWhite: input.isForWhite,
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
