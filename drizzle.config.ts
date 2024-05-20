import {getDbConnectionString} from "@/lib/database";
import {defineConfig} from "drizzle-kit"

export default defineConfig({
    dialect: "postgresql",
    dbCredentials: {
        url: getDbConnectionString()
    },
    schema: "./lib/database/schema.ts",
    out: "./drizzle",
})