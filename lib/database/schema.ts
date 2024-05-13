import {boolean, integer, pgTable, timestamp, varchar} from "drizzle-orm/pg-core"
import {relations} from "drizzle-orm";

export const counterPages = pgTable("counter_page", {
    id: varchar("id", {length: 36}).notNull().primaryKey(),
    domain: varchar("domain", {length: 36}).notNull(),
});
export const counterPageRelations = relations(counterPages, ({many}) => ({
    counters: many(counters),
}));

export const counters = pgTable("counter", {
    id: varchar("id", {length: 36}).notNull().primaryKey(),
    counterPageId: varchar("counter_page_id", {length: 36}).notNull(),

    count: integer("count").notNull(),
    changed: boolean("changed").default(false).notNull(),
    highlighted: boolean("highlighted").default(false).notNull(),

    createdAt: timestamp("created_at", {mode: "date"}).notNull().defaultNow(),
});
export const counterRelations = relations(counters, ({one}) => ({
    counterPage: one(counterPages, {
        fields: [counters.counterPageId],
        references: [counterPages.id],
    }),
    layout: one(counterLayouts, {
        fields: [counters.id],
        references: [counterLayouts.forCounter],
    }),
}));

export const counterLayouts = pgTable("counter_layout", {
    id: varchar("id", {length: 36}).notNull().primaryKey(),
    forCounter: varchar("for_counter_id", {length: 36}).notNull(),

    x: integer("x").notNull(),
    y: integer("y").notNull(),
    w: integer("w").notNull(),
    h: integer("h").notNull(),
});
export const counterLayoutRelations = relations(counterLayouts, ({one}) => ({
    counter: one(counters, {
        fields: [counterLayouts.forCounter],
        references: [counters.id],
    }),
}));