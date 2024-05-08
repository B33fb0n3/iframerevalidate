import Buttons from "@/app/editor/[id]/Buttons";
import {draftMode} from "next/headers";
import ViewCounter from "@/app/counter/[id]/ViewCounter";
import {getCounterDraft} from "@/app/fetcher";

type EditorPageProps = {
    params: {
        id: string
    }
}

export default async function CounterPage({params: {id}}: EditorPageProps) {
    console.log("---View Editor Page---")
    const counter = await getCounterDraft(id);
    const {isEnabled} = draftMode()

    return (
        <>
            <h1>Dynamic Page</h1>
            <p>Draftmode: {isEnabled ? "yes" : "no"}</p>
            <p>Count: {counter?.count}</p>
            <p>Is different from prod: {counter?.changed ? "yes" : "no"}</p>
            <Buttons counterId={id}/>
            <ViewCounter counterId={id} />
        </>
    )
}