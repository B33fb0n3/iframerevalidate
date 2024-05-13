import {draftMode} from "next/headers";
import {notFound} from "next/navigation";
import {getCounter, getPage} from "@/app/fetcher";

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
            {/*<Grid items={myCounters}/>*/}
            {myCounters.map(async (counter) => {
                const {isEnabled} = draftMode()
                if (isEnabled)
                    counter = await getCounter(counter.id, isEnabled) as any

                return <Counter key={counter.id} count={counter.count} id={counter.id}/>
            })}
        </>
    )
}

async function Counter({count, id}: any) {
    return <>
        <p>id: {id}</p>
        <p>count: {count}</p>
    </>
}