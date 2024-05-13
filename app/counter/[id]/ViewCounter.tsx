import {draftMode} from "next/headers";
import {notFound} from "next/navigation";
import {getPage} from "@/app/fetcher";
import Grid from "@/app/editor/[id]/Grid";

type ViewCounterProps = {
    domain: string;
}

export default async function ViewCounter({domain}: ViewCounterProps) {
    const {isEnabled} = draftMode()
    const page = await getPage(domain, isEnabled);

    if (!page)
        return notFound();

    const myCounters = page.counters;

    return (
        <>
            <h1>StaticPage</h1>
            <Grid items={myCounters}/>
        </>
    )
}

async function Counter({count, id}: any) {
    return <>
        <p>id: {id}</p>
        <p>count: {count}</p>
    </>
}