import express, {json} from "express";
import cors from 'cors';
import chalk from "chalk";
import dotenv from 'dotenv';
import userRouter from "./routers/userRouter.js";
import transactionsRouter from "./routers/transactionsRouter.js";

dotenv.config(); 

const app = express()
app.use(json())
app.use(cors());
app.use(userRouter);
app.use(transactionsRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(chalk.bold.green(`Server is running on port/${port}`));
});
