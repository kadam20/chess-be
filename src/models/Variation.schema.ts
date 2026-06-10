import { isNonEmptyString, isString } from 'jet-validators';
import { parseObject, Schema, testObject } from 'jet-validators/utils';

import { isUuid } from '@src/common/utils/validators';

/******************************************************************************
                                  Types
******************************************************************************/

export interface IVariationInput {
    name: string;
    moves: string;
    openingId: string;
}

export interface IVariationUpdate extends IVariationInput {
    id: string;
}

/******************************************************************************
                                 Constants
******************************************************************************/

const inputSchema: Schema<IVariationInput> = {
    name: isNonEmptyString,
    moves: isString,
    openingId: isUuid,
};

const updateSchema: Schema<IVariationUpdate> = {
    id: isUuid,
    ...inputSchema,
};

const parseVariationInput = parseObject<IVariationInput>(inputSchema);
const parseVariationUpdate = parseObject<IVariationUpdate>(updateSchema);

const isCompleteVariationInput = testObject<IVariationInput>(inputSchema);
const isCompleteVariationUpdate = testObject<IVariationUpdate>(updateSchema);

/******************************************************************************
                                Export default
******************************************************************************/

export default {
    parseInput: parseVariationInput,
    parseUpdate: parseVariationUpdate,
    isCompleteInput: isCompleteVariationInput,
    isCompleteUpdate: isCompleteVariationUpdate,
} as const;
