import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { isUuid } from '@src/common/utils/validators';
import OpeningSchema from '@src/models/Opening.schema';
import OpeningService from '@src/services/OpeningService';

import { Req, Res } from './common/express-types';
import parseReq from './common/parseReq';

/******************************************************************************
                                Constants
******************************************************************************/

const reqValidators = {
    add: parseReq({ opening: OpeningSchema.isCompleteInput }),
    update: parseReq({ opening: OpeningSchema.isCompleteUpdate }),
    getOne: parseReq({ id: isUuid }),
    delete: parseReq({ id: isUuid }),
} as const;

/******************************************************************************
                                Functions
******************************************************************************/

/**
 * Get all openings.
 *
 * @route GET /api/openings/all
 */
async function getAll(_: Req, res: Res) {
    const openings = await OpeningService.getAll();
    res.status(HttpStatusCodes.OK).json({ openings });
}

/**
 * Get one opening by id.
 *
 * @route GET /api/openings/:id
 */
async function getOne(req: Req, res: Res) {
    const { id } = reqValidators.getOne(req.params);
    const opening = await OpeningService.getOne(id);
    res.status(HttpStatusCodes.OK).json({ opening });
}

/**
 * Add one opening.
 *
 * @route POST /api/openings/add
 */
async function add(req: Req, res: Res) {
    const { opening } = reqValidators.add(req.body);
    const created = await OpeningService.addOne(opening);
    res.status(HttpStatusCodes.CREATED).json({ opening: created });
}

/**
 * Update one opening.
 *
 * @route PUT /api/openings/update
 */
async function update(req: Req, res: Res) {
    const { opening } = reqValidators.update(req.body);
    await OpeningService.updateOne(opening);
    res.status(HttpStatusCodes.OK).end();
}

/**
 * Delete one opening.
 *
 * @route DELETE /api/openings/delete/:id
 */
async function delete_(req: Req, res: Res) {
    const { id } = reqValidators.delete(req.params);
    await OpeningService.delete(id);
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
