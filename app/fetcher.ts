import {unstable_cache} from "next/cache";
import {db} from "@/lib/database";
import {eq} from "drizzle-orm";
import {counters} from "@/lib/database/schema";

export const getCounter = async (counterId: string, direct: boolean = true) => {
    return db.query.counters.findFirst({
        where: eq(counters.id, counterId),
        columns: {
            count: true,
            changed: true,
        }
    })
}

export const getCounterDraft = async (counterId: string) => {
    return unstable_cache(
        async () => {
            return getCounter(counterId, false);
        },
        [`draft-counter-${counterId}`],
        {tags: [`draft-counter-${counterId}`]}
    )();
}

export const getCounterProd = async (counterId: string) => {
    return unstable_cache(
        async () => {
            return getCounter(counterId, false);
        },
        [`counter-${counterId}`],
        {tags: [`counter-${counterId}`]}
    )();
}