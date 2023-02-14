import { PrismaClient } from "@prisma/client";

const Database = PrismaClient;

const database = new Database();

export { database };
