import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { isUuid } from '@src/common/utils/validators';
import VariationSchema from '@src/models/Variation.schema';
import VariationService from '@src/services/VariationService';

import { Req, Res } from './common/express-types';
import parseReq from './common/parseReq';

/******************************************************************************
                                Constants
******************************************************************************/

const reqValidators = {
    add: parseReq({ variation: VariationSchema.isCompleteInput }),
    update: parseReq({ variation: VariationSchema.isCompleteUpdate }),
    getOne: parseReq({ id: isUuid }),
    delete: parseReq({ id: isUuid }),
} as const;

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all variations.
 *
 * @route GET /api/variations/all
 */
async function getAll(_: Req, res: Res) {
    const variations = await VariationService.getAll();
    res.status(HttpStatusCodes.OK).json({ variations });
}

/**
 * Get one variation by id.
 *
 * @route GET /api/variations/:id
 */
async function getOne(req: Req, res: Res) {
    const { id } = reqValidators.getOne(req.params);
    const variation = await VariationService.getOne(id);
    res.status(HttpStatusCodes.OK).json({ variation });
}

/**
 * Add one variation.
 *
 * @route POST /api/variations/add
 */
async function add(req: Req, res: Res) {
    const { variation } = reqValidators.add(req.body);
    const created = await VariationService.addOne(variation);
    res.status(HttpStatusCodes.CREATED).json({ variation: created });
}

/**
 * Update one variation.
 *
 * @route PUT /api/variations/update
 */
async function update(req: Req, res: Res) {
    const { variation } = reqValidators.update(req.body);
    await VariationService.updateOne(variation);
    res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one variation.
 *
 * @route DELETE /api/variations/delete/:id
 */
async function delete_(req: Req, res: Res) {
    const { id } = reqValidators.delete(req.params);
    await VariationService.delete(id);
    res.status(HttpStatusCodes.OK).end();
}

/******************************************************************************
                                Export default
******************************************************************************/

export default {
    getAll,
    getOne,
    add,
    update,
    delete: delete_,
} as const;
