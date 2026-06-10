import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/utils/route-errors';
import { Opening } from '@src/models/Opening.model';
import { IOpeningInput, IOpeningUpdate } from '@src/models/Opening.schema';
import OpeningRepo from '@src/repos/OpeningRepo';

/******************************************************************************
                                Constants
******************************************************************************/

const Errors = {
    OPENING_NOT_FOUND: 'Opening not found',
} as const;

/******************************************************************************
                                Functions
******************************************************************************/

function getAll(): Promise<Opening[]> {
    return OpeningRepo.getAll();
}

async function getOne(id: string): Promise<Opening> {
    const opening = await OpeningRepo.getOne(id);
    if (!opening) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            Errors.OPENING_NOT_FOUND,
        );
    }
    return opening;
}

function addOne(input: IOpeningInput): Promise<Opening> {
    return OpeningRepo.add(input);
}

async function updateOne(input: IOpeningUpdate): Promise<void> {
    const exists = await OpeningRepo.persists(input.id);
    if (!exists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            Errors.OPENING_NOT_FOUND,
        );
    }
    return OpeningRepo.update(input);
}

async function deleteOne(id: string): Promise<void> {
    const exists = await OpeningRepo.persists(id);
    if (!exists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            Errors.OPENING_NOT_FOUND,
        );
    }
    return OpeningRepo.delete(id);
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
    Errors,
    getAll,
    getOne,
    addOne,
    updateOne,
    delete: deleteOne,
} as const;
