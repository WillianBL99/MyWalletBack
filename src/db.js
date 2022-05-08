import {MongoClient} from "mongodb";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

let db = null;
try {
  const mongoClient = new MongoClient(process.env.MONGO_URI);
  await mongoClient.connect();
  db = mongoClient.db(process.env.MW_DATABASE);
  console.log(chalk.bold.green("Database connection has been established!"));
} catch(e) {
  console.log(chalk.bold.red("Error connecting to database!"), e);
}

export default db;