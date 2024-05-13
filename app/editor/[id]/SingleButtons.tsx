'use client'

import {Button} from "@/components/ui/button";
import {publishChanges, toggleDraftmode} from "@/app/editor/[id]/actions";

export default function SingleButtons() {
    return <>
        <Button onClick={() => publishChanges()}>Publish all changes</Button>
        <Button onClick={() => toggleDraftmode()}>Toggle Draftmode</Button>
    </>
}