import {unstable_cache} from "next/cache";
import {db} from "@/lib/database";
import {desc, eq} from "drizzle-orm";
import {counterPages, counters} from "@/lib/database/schema";
import {cache} from 'react';

const fetchCounter = async (counterId: string) => {
    console.log("getCounter", new Date())

    return db.query.counters.findFirst({
        where: eq(counters.id, counterId),
        columns: {
            id: true,
            count: true,
            changed: true,
        }
    })
}

export const getCounter = cache(async (counterId: string, draft: boolean) => {
    const tag = !draft ? `counter-${counterId}` : `draft-counter-${counterId}`

    return unstable_cache(
        async () => {
            return fetchCounter(counterId);
        },
        [tag],
        {tags: [tag]}
    )();
});

export const getPage = async (domain: string, draft: boolean) => {
    const tag = !draft ? `page-${domain}` : `draft-page-${domain}`

    return unstable_cache(
        async () => {
            console.log("getPage", new Date())
            return db.query.counterPages.findFirst({
                columns: {},
                where: eq(counterPages.domain, domain),
                with: {
                    counters: {
                        columns: {
                            id: true,
                            count: true,
                        },
                        orderBy: [desc(counters.id)]
                    },
                }
            });
        },
        [tag],
        {tags: [tag]}
    )();
}

export const getSettings = async (domain: string, draft: boolean) => {
    const tag = !draft ? `settings-${domain}` : `draft-settings-${domain}`

    return unstable_cache(
        async () => {
            console.log("getSettings", new Date())
            return db.select({allCounter: {id: counters.id}}).from(counters)
                .innerJoin(counterPages, eq(counterPages.id, counters.counterPageId))
                .orderBy(desc(counters.id))
                .where(eq(counterPages.domain, domain))
        },
        [tag],
        {tags: [tag]}
    )();
}