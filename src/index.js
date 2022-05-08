import express, {json} from "express";
import cors from 'cors';
import chalk from "chalk";
import dotenv from 'dotenv';
import userRouter from "./routers/userRouter.js";
import transactionsRouter from "./routers/transactionsRouter.js";

dotenv.config(); 

//8Pj5frztwEHC7M1p
//mongodb+srv://new_user_my_wallet:<password>@cluster0.z7dep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const app = express()
app.use(json())
app.use(cors());
app.use(userRouter);
app.use(transactionsRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(chalk.bold.green(`Server running on port/${port}`));
});
