import {getDbConnectionString} from "@/lib/database";
import type {Config} from "drizzle-kit";

export default {
    schema: "./lib/database/schema.ts",
    driver: "pg",
    dbCredentials: {
        connectionString: getDbConnectionString()
    },
    out: "./drizzle",
} satisfies Config