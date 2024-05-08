'use server'

import {db} from "@/lib/database";
import {counters} from "@/lib/database/schema";
import {eq, sql} from "drizzle-orm";
import {revalidatePath, revalidateTag} from "next/cache";
import {draftMode} from "next/headers";

export async function increaseCounter(counterId: string) {
    await db
        .update(counters)
        .set({
            count: sql`${counters.count} + 1`,
            changed: true,
        })
        .where(eq(counters.id, counterId));
    revalidateTag("draft-counter-" + counterId)
}

export async function decreaseCounter(counterId: string) {
    await db
        .update(counters)
        .set({
            count: sql`${counters.count} - 1`,
            changed: true,
        })
        .where(eq(counters.id, counterId));
    revalidateTag("draft-counter-" + counterId)
}

export async function toggleDraftmode() {
    const {isEnabled} = draftMode()
    if (!isEnabled)
        draftMode().enable()
    else
        draftMode().disable()
}

export async function publishCounter(counterId: string) {
    revalidateTag("draft-counter-" + counterId);
    revalidateTag("counter-" + counterId);
    await db
        .update(counters)
        .set({
            changed: false,
        })
        .where(eq(counters.id, counterId));
}