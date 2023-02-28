import { PrismaClient } from "./generated";

const Database = PrismaClient;

const database = new Database();

export { database as relationalDb };
