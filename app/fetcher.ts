import {memoize} from "nextjs-better-unstable-cache";
import {draftMode} from "next/headers";
import {counterLayouts, counterPages, counters} from "@/lib/database/schema";
import {db} from "@/lib/database";
import {desc, eq} from "drizzle-orm";

export const getCounter = memoize(
    async (counterId: string) => db.query.counters.findFirst({
        where: eq(counters.id, counterId),
        columns: {
            id: true,
            count: true,
            changed: true,
        }
    }),
    {
        revalidateTags: (counterId) => {
            const {isEnabled} = draftMode();
            return [isEnabled ? `draft-counter-${counterId}` : `counter-${counterId}`]
        },
        log: ['datacache'],
        logid: "getCounter"
    }
)

export const getSettings = memoize(
    async (domain: string) => db.select({allCounter: {id: counters.id}}).from(counters)
        .innerJoin(counterPages, eq(counterPages.id, counters.counterPageId))
        .orderBy(desc(counters.id))
        .where(eq(counterPages.domain, domain)),
    {
        revalidateTags: (domain) => {
            const {isEnabled} = draftMode();
            return [isEnabled ? `draft-settings-${domain}` : `settings-${domain}`]
        },
        log: ['datacache'],
        logid: "getSettings"
    }
)

export const getPage = memoize(
    async (domain: string) => db.query.counterPages.findFirst({
        columns: {
            id: true,
        },
        where: eq(counterPages.domain, domain),
        with: {
            counters: {
                columns: {
                    id: true,
                },
            },
        }
    }),
    {
        revalidateTags: (domain) => {
            const {isEnabled} = draftMode();
            return [isEnabled ? `draft-page-${domain}` : `page-${domain}`]
        },
        log: ['datacache'],
        logid: "getPage"
    }
)

export const getCounterLayout = memoize(
    async (counterId: string) => db.query.counterLayouts.findFirst({
        where: eq(counterLayouts.forCounter, counterId)
    }),
    {
        revalidateTags: (counterId) => {
            const {isEnabled} = draftMode();
            return [isEnabled ? `draft-counter-layout-${counterId}` : `counter-layout-${counterId}`]
        },
        log: ['datacache'],
        logid: "getCounterLayout"
    }
)