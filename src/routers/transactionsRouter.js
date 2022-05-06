import {Router} from 'express';
import { getTransactions, postTransaction} from '../controllers/transactionsController.js';
import headerAuthorization from '../middlewares/authorizationMiddleware.js';

const transactionsRouter = Router();

transactionsRouter.use(headerAuthorization);
transactionsRouter.get('/get-transactions', getTransactions);
transactionsRouter.post('/post-transaction', postTransaction);

export default transactionsRouter;