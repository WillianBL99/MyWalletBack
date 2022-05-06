import chalk from "chalk";
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';
import joi from "joi";
import db from '../db.js';

export async function signUp(req, res) {
    try {
        const {body} = req; // name, email, password
        const userSchema = joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().min(4).required()
        });

        const {error} = userSchema.validate(body, {abortEarly:false});        
        
        if (error) {
            return res.status(422).send(
                error.details.map((detail) => detail.message)
            )
        }

        //TODO: verificar se usuário já foi cadastrado
            
        const passwordHash = bcrypt.hashSync(body.password, 10);
        await db.collection('users').insertOne({...body, password: passwordHash});

        delete body.password;

        res.sendStatus(201)
        
    } catch (e) {
        console.log(chalk.bold.red('Error on sign-up'), e);
        return res.status(500).send('error register');
    }
}

export async function signIn(req, res) {
    try {
        const {password, email} = req.body;
        const user = await db.collection('users').findOne({email});
    
        if(user && bcrypt.compareSync(password, user.password)){
            const token = uuid();
            await db.collection('sessions').insertOne({userId: user._id, token});
            return res.send(token);
        } else {
            return res.status(404).send('Incorrect email or password');
        }

    } catch (e){
        console.log(chalk.bold.red('Error on sign-in'), e);
        return res.status(500).send('error login');
    }
}