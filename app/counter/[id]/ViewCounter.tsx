import {getCounterDraft, getCounterProd} from "@/app/fetcher";
import {draftMode} from "next/headers";

type ViewCounterProps = {
    counterId: string;
}

export default async function ViewCounter({counterId}: ViewCounterProps) {
    const {isEnabled} = draftMode()
    const counter = await (isEnabled ? getCounterDraft(counterId) : getCounterProd(counterId));

    return (
        <>
            <h1>StaticPage</h1>
            <p>Count: {counter?.count}</p>
        </>
    )
}