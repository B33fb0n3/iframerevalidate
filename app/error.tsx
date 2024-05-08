'use client'

import {useEffect} from 'react'
import {useLogger} from "next-axiom";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {BiSolidErrorAlt} from "react-icons/bi";

export default function Error(
    {
        error,
        reset,
    }: {
        error: Error & { digest?: string }
        reset: () => void
    }) {

    const log = useLogger();

    useEffect(() => {
        log.error(error.message, {
            data: JSON.stringify({error})
        })
    }, [error])

    return (
        <div className={"flex flex-col gap-y-6 min-h-[500px] items-center py-8 px-2"}>
            <BiSolidErrorAlt className={"w-24 h-24 text-destructive"}/>
            <div className={"flex flex-col gap-y-2 items-center text-center"}>
                <h1 className={"text-2xl"}>Something broke :(</h1>
                <p>#{error.digest}</p>
            </div>
            <Button onClick={reset}>
                Try again
            </Button>
        </div>
    )
}