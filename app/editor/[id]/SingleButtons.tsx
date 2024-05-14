'use client'

import {Button} from "@/components/ui/button";
import {publishChanges, toggleDraftmode} from "@/app/editor/[id]/actions";
import {useContext} from "react";
import {UndoRedoContext} from "@/app/editor/[id]/undoRedoContext";

export default function SingleButtons() {
    const {canRedo, canUndo, redo, undo, isDirty, clearHistory} = useContext(UndoRedoContext);

    return <>
        <Button onClick={() => {
            publishChanges().then(clearHistory)
        }}>Publish all changes</Button>
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
        <div>
            <p>{JSON.stringify({canRedo, canUndo, isDirty}, null, 2)}</p>
            <Button disabled={!canUndo} onClick={undo}>Undo</Button>
            <Button disabled={!canRedo} onClick={redo}>Redo</Button>
        </div>
    </>
}