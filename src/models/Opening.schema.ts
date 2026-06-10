import { isBoolean, isNonEmptyString, isString } from 'jet-validators';
import { parseObject, Schema, testObject } from 'jet-validators/utils';

import { isUuid } from '@src/common/utils/validators';

/******************************************************************************
                                  Types
******************************************************************************/

export interface IOpeningInput {
    name: string;
    ecoCode: string;
    description: string;
    isForWhite: boolean;
}

export interface IOpeningUpdate extends IOpeningInput {
    id: string;
}

/******************************************************************************
                                 Constants
******************************************************************************/

const inputSchema: Schema<IOpeningInput> = {
    name: isNonEmptyString,
    ecoCode: isNonEmptyString,
    description: isString,
    isForWhite: isBoolean,
};

const updateSchema: Schema<IOpeningUpdate> = {
    id: isUuid,
    ...inputSchema,
};

const parseOpeningInput = parseObject<IOpeningInput>(inputSchema);
const parseOpeningUpdate = parseObject<IOpeningUpdate>(updateSchema);

const isCompleteOpeningInput = testObject<IOpeningInput>(inputSchema);
const isCompleteOpeningUpdate = testObject<IOpeningUpdate>(updateSchema);

/******************************************************************************
                                Export default
******************************************************************************/

export default {
    parseInput: parseOpeningInput,
    parseUpdate: parseOpeningUpdate,
    isCompleteInput: isCompleteOpeningInput,
    isCompleteUpdate: isCompleteOpeningUpdate,
} as const;
