import {boolean, integer, pgTable, timestamp, varchar} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm";

export const counters = pgTable("counter", {
    id: varchar("id", {length: 36}).notNull().primaryKey(),
    counterPageId: varchar("counter_page_id", {length: 36}).notNull(),

    count: integer("count").notNull(),
    changed: boolean("changed").default(false).notNull(),

    createdAt: timestamp("created_at", {mode: "date"}).notNull().defaultNow(),
});
export const counterRelations = relations(counters, ({one}) => ({
    counterPage: one(counterPages, {
        fields: [counters.counterPageId],
        references: [counterPages.id],
    }),
}));

export const counterPages = pgTable("counter_page", {
    id: varchar("id", {length: 36}).notNull().primaryKey(),
    domain: varchar("domain", {length: 36}).notNull(),
});
export const counterPageRelations = relations(counterPages, ({many}) => ({
    counters: many(counters),
}));