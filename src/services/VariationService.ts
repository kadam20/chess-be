import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/utils/route-errors';
import { Variation } from '@src/models/Variation.model';
import {
    IVariationInput,
    IVariationUpdate,
} from '@src/models/Variation.schema';
import OpeningRepo from '@src/repos/OpeningRepo';
import VariationRepo from '@src/repos/VariationRepo';

/******************************************************************************
                                Constants
******************************************************************************/

const Errors = {
    VARIATION_NOT_FOUND: 'Variation not found',
    OPENING_NOT_FOUND: 'Opening not found',
} as const;

/******************************************************************************
                                Functions
******************************************************************************/

function getAll(): Promise<Variation[]> {
    return VariationRepo.getAll();
}

async function getOne(id: string): Promise<Variation> {
    const variation = await VariationRepo.getOne(id);
    if (!variation) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            Errors.VARIATION_NOT_FOUND,
        );
    }
    return variation;
}

async function addOne(input: IVariationInput): Promise<Variation> {
    const opening = await OpeningRepo.getOne(input.openingId);
    if (!opening) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            Errors.OPENING_NOT_FOUND,
        );
    }
    return VariationRepo.add(input, opening);
}

async function updateOne(input: IVariationUpdate): Promise<void> {
    const exists = await VariationRepo.persists(input.id);
    if (!exists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            Errors.VARIATION_NOT_FOUND,
        );
    }

    const opening = await OpeningRepo.getOne(input.openingId);
    if (!opening) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            Errors.OPENING_NOT_FOUND,
        );
    }

    return VariationRepo.update(input, opening);
}

async function deleteOne(id: string): Promise<void> {
    const exists = await VariationRepo.persists(id);
    if (!exists) {
        throw new RouteError(
            HttpStatusCodes.NOT_FOUND,
            Errors.VARIATION_NOT_FOUND,
        );
    }
    return VariationRepo.delete(id);
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
