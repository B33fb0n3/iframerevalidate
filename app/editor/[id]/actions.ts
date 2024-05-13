'use server'

import {db} from "@/lib/database";
import {counterLayouts, counters} from "@/lib/database/schema";
import {eq, sql} from "drizzle-orm";
import {revalidateTag} from "next/cache";
import {draftMode} from "next/headers";
import {getUUID} from "@/lib/utils";
import {CounterPosition} from "@/app/editor/[id]/types";

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

export async function publishChanges() {
    const result = await db
        .update(counters)
        .set({
            changed: false,
        })
        .where(eq(counters.changed, true)).returning({updatedCounterId: counters.id});

    result.map((singleResult) => {
        revalidateTag("draft-counter-" + singleResult.updatedCounterId);
    })
}

export async function setNewCounterLayout(
    layoutId: string,
    position: CounterPosition,
) {
    const result = await db
        .update(counterLayouts)
        .set(position)
        .where(eq(counterLayouts.id, layoutId)).returning({counterId: counterLayouts.forCounter});

    const counterId = result[0].counterId;
    revalidateTag(`draft-counter-layout-${counterId}`)
}

export async function createNewCounter(pageId: string, position: CounterPosition) {
    const newCounterId = getUUID("count")

    await db.insert(counters).values({
        id: newCounterId,
        changed: true,
        counterPageId: pageId,
        count: 0,
    });

    await db.insert(counterLayouts).values({
        id: getUUID("count_layout"),
        forCounter: newCounterId,
        x: position.x || 0,
        y: position.y || 0,
        h: position.h || 0,
        w: position.w || 0,
    });

    revalidateTag(`draft-counter-${newCounterId}`)
    revalidateTag(`draft-counter-layout-${newCounterId}`)
}