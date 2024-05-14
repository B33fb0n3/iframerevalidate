'use client'

import {Button} from "@/components/ui/button";
import {decreaseCounter, increaseCounter} from "@/app/editor/[id]/actions";
import {useContext} from "react";
import {UndoRedoContext} from "@/app/editor/[id]/undoRedoContext";

type ButtonsProps = {
    counterId: string
}

export default function CounterButtons({counterId}: ButtonsProps) {
    const {pushAction} = useContext(UndoRedoContext);

    const increase = async () => {
        pushAction({
            redoAction: () => increaseCounter(counterId),
            undoAction: () => decreaseCounter(counterId),
        }, true);
    }

    const decrease = async () => {
        pushAction({
            redoAction: () => decreaseCounter(counterId),
            undoAction: () => increaseCounter(counterId),
        }, true);
    }

    return (
        <>
            <Button onClick={increase}>+</Button>
            <Button onClick={decrease}>-</Button>
        </>
    )
}