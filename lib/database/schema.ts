import {boolean, integer, pgTable, timestamp, varchar} from "drizzle-orm/pg-core"

export const counters = pgTable("counter", {
    id: varchar("id", {length: 36}).notNull().primaryKey(),
    count: integer("count").notNull(),
    changed: boolean("changed").default(false).notNull(),
    createdAt: timestamp("created_at", {mode: "date"}).notNull().defaultNow(),
});