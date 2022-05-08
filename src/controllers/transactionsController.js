import chalk from "chalk";
import db from '../db.js';
import joi from 'joi';
import dayjs from 'dayjs'

export async function getTransactions(req, res) {
    try {
        const {_id: userId} = req.authorizedUser;

        const transactions = await db.collection('transactions').find({userId}).toArray();
        res.send(transactions);

    } catch (e){
        const textError = 'Error getting transactions';
        console.log(chalk.bold.red(textError), e);
        return res.status(500).send(textError);
    }
}

export async function postTransaction(req, res) {
    try {
        const {_id: userId} = req.authorizedUser;
        const transaction = req.body;

        const userSchema = joi.object({
            description: joi.string().min(4).required(),
            operation: joi.any().valid('entry', 'exit').required(),
            price: joi.number().precision(2).required()
        });

         const {error} = userSchema.validate(transaction, {abortEarly:false});        
        
        if (error) {
            return res.status(422).send(
                error.details.map((detail) => detail.message)
            )
        }

        const date = dayjs().format('DD/MM');

        await db.collection('transactions').insertOne({
           date,
           userId,
           ...transaction 
        });

        res.sendStatus(201);

    } catch (e){
        const textError = 'Error posting transactions';
        console.log(chalk.bold.red(textError), e);
        return res.status(500).send(textError);
    }
}