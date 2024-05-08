'use client'

import {Button} from "@/components/ui/button";
import {decreaseCounter, increaseCounter, publishCounter, toggleDraftmode} from "@/app/editor/[id]/actions";

type ButtonsProps = {
    counterId: string
}

export default function Buttons({counterId}: ButtonsProps) {
    return (
        <>
            <Button onClick={() => increaseCounter(counterId)}>+</Button>
            <Button onClick={() => decreaseCounter(counterId)}>-</Button>
            <Button onClick={() => toggleDraftmode()}>Toggle Draftmode</Button>
            <Button onClick={() => publishCounter(counterId)}>Publish</Button>
        </>
    )
}