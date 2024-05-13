import {draftMode} from "next/headers";
import Section from "@/app/counter/[id]/Section";
import Grid from "@/app/editor/[id]/Grid";
import {notFound} from "next/navigation";
import {getCounter, getCounterLayout, getPage} from "@/app/fetcher";

type ViewCounterProps = {
    domain: string;
}

export default async function ViewCounter({domain}: ViewCounterProps) {
    const {isEnabled} = draftMode()
    const page = await getPage(domain);

    if (!page)
        return notFound();

    const items = await Promise.all(page.counters.map(async (counter) => {
        const itemPromise = getCounter(counter.id);
        const itemLayoutPromise = getCounterLayout(counter.id);

        const [item, itemLayout] = await Promise.all([itemPromise, itemLayoutPromise]);

        return {
            item,
            itemLayout,
        }
    }));

    return (
        <>
            <h1>StaticPage</h1>
            <div className={"relative"}>
                {isEnabled && <Grid pageId={page.id} items={items}/>}
                <Section items={items}/>
            </div>
        </>
    )
}