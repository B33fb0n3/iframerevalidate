import CounterButtons from "@/app/editor/[id]/CounterButtons";
import {draftMode} from "next/headers";
import ViewCounter from "@/app/counter/[id]/ViewCounter";
import {getCounter, getSettings} from "@/app/fetcher";
import SingleButtons from "@/app/editor/[id]/SingleButtons";
import {UndoRedoProvider} from "@/app/editor/[id]/undoRedoContext";

type EditorPageProps = {
    params: {
        id: string
    }
}

export default async function CounterPage({params: {id}}: EditorPageProps) {
    const {isEnabled} = draftMode();
    const settings = await getSettings(id);

    return (
        <>
            <UndoRedoProvider>
                <h1>Dynamic Page</h1>
                <p>Draftmode: {isEnabled ? "yes" : "no"}</p>
                <i>&quot;Settings&quot;</i>
                {settings.map(async (relation) => {
                    const counter = await getCounter(relation.allCounter.id);
                    if (!counter)
                        return null;

                    return <>
                        <p>id: {counter.id}</p>
                        <p>count: {counter.count}</p>
                        <p>changed: {counter.changed ? "ja" : "nein"}</p>
                        <CounterButtons counterId={counter.id}/>
                    </>
                })}
                <br/>
                <SingleButtons/>
                <ViewCounter domain={id}/>
            </UndoRedoProvider>
        </>
    )
}