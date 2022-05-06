import {Router} from 'express';
import { getTransactions } from '../controllers/transactionsController.js';
import headerAuthorization from '../middlewares/authorizationMiddleware.js';

const transactionsRouter = Router();

//transactionsRouter.use(headerAuthorization);
transactionsRouter.get('/get-transactions',headerAuthorization, getTransactions);

export default transactionsRouter;