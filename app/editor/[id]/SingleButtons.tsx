'use client'

import {Button} from "@/components/ui/button";
import {publishChanges, toggleDraftmode} from "@/app/editor/[id]/actions";

export default function SingleButtons() {

    return <>
        <Button onClick={() => publishChanges()}>Publish all changes</Button>
        <Button onClick={() => toggleDraftmode()}>Toggle Draftmode</Button>
        <div
            className={"droppable-element flex gap-x-2 items-center cursor-pointer transition rounded-md hover:bg-secondary py-2 px-2"}
            draggable={true}
            unselectable="on"
            onDragStart={e => {
                e.dataTransfer.setData("text/plain", JSON.stringify({
                    name: "Element",
                    type: "counter",
                    h: 6,
                    w: 8,
                    version: 1.0,
                    content: ""
                }));
            }}
        >
            <p>New Counter (Drag Drop)</p>
        </div>
    </>
}