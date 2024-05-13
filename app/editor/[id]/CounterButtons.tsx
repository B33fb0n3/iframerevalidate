'use client'

import {Button} from "@/components/ui/button";
import {decreaseCounter, increaseCounter} from "@/app/editor/[id]/actions";

type ButtonsProps = {
    counterId: string
}

export default function CounterButtons({counterId}: ButtonsProps) {
    return (
        <>
            <Button onClick={() => increaseCounter(counterId)}>+</Button>
            <Button onClick={() => decreaseCounter(counterId)}>-</Button>
        </>
    )
}