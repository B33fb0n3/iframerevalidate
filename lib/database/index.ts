import postgres from "postgres";
import * as schema from '@/lib/database/schema'
import {drizzle} from 'drizzle-orm/postgres-js';
import * as dotenv from "dotenv";
import dotenvExpand from 'dotenv-expand';

dotenvExpand.expand(dotenv.config({
    path: ['.env.development.local', '.env.production.local', '.env.local']
}))

export function getDbConnectionString() {
    const get = (variable: string) => {
        return process.env[variable];
    }
    return `postgres://${get("DATABASE_USERNAME")}:${get("DATABASE_PASSWORD")}@${get("DATABASE_HOST")}:${get("DATABASE_PORT")}/${get("DATABASE_NAME")}`
}

const queryClient = postgres(getDbConnectionString());
export const db = drizzle(queryClient, {schema});