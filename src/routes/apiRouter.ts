import { Router } from 'express';

import Paths from '@src/common/constants/Paths';

import OpeningRoutes from './OpeningRoutes';
import UserRoutes from './UserRoutes';
import VariationRoutes from './VariationRoutes';

/******************************************************************************
                                Setup
******************************************************************************/

const apiRouter = Router();

// ----------------------- Add UserRouter --------------------------------- //

const userRouter = Router();

userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
userRouter.put(Paths.Users.Update, UserRoutes.update);
userRouter.delete(Paths.Users.Delete, UserRoutes.delete);

apiRouter.use(Paths.Users._, userRouter);

// --------------------- Add OpeningRouter -------------------------------- //

const openingRouter = Router();

openingRouter.get(Paths.Openings.GetAll, OpeningRoutes.getAll);
openingRouter.get(Paths.Openings.GetOne, OpeningRoutes.getOne);
openingRouter.post(Paths.Openings.Add, OpeningRoutes.add);
openingRouter.put(Paths.Openings.Update, OpeningRoutes.update);
openingRouter.delete(Paths.Openings.Delete, OpeningRoutes.delete);

apiRouter.use(Paths.Openings._, openingRouter);

// -------------------- Add VariationRouter ------------------------------- //

const variationRouter = Router();

variationRouter.get(Paths.Variations.GetAll, VariationRoutes.getAll);
variationRouter.get(Paths.Variations.GetOne, VariationRoutes.getOne);
variationRouter.post(Paths.Variations.Add, VariationRoutes.add);
variationRouter.put(Paths.Variations.Update, VariationRoutes.update);
variationRouter.delete(Paths.Variations.Delete, VariationRoutes.delete);

apiRouter.use(Paths.Variations._, variationRouter);

/******************************************************************************
                                Export
******************************************************************************/

export default apiRouter;
