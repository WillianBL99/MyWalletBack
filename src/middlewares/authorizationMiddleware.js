import chalk from "chalk";
import db from "../db.js";

export default async function headerAuthorization(req, res, next){
   try {
    const {authorization} = req.headers;
    if(!authorization){
        const textError = 'Authorization was not sent';
        console.log(chalk.bold.red(textError));
        return res.status(401).send(textError);
    }

    if(!authorization.includes('Bearer ')) {
        const textError = 'Authorization sent incorrectly';
        console.log(chalk.bold.red(textError));
        return res.status(401).send(textError);
    }

    const token = authorization.replace('Bearer ', '');
    const session = await db.collection('sessions').findOne({token});

    if(!session) {
        return res.status(401).send('Token denied')
    }

    const user = await db.collection('users').findOne({
        _id: session.userId
    });

    if(!user) return res.status(404).send('User not found');

    delete user.password;
    
    req.authorizedUser = user;

    next();
   } catch (e) {
    const textError = 'Error checking authorization';
    console.log(chalk.bold.red(textError), e);
    return res.status(500).send(textError);
   }
}