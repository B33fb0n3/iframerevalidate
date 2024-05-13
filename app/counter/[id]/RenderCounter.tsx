import React from "react";

type RenderCounterProps = {
    counter: {
        id: string
        count: number
    }
} & React.ComponentProps<'p'>

export default function RenderCounter({counter, ...props}: RenderCounterProps) {
    return <p {...props}>{counter.id}, {counter.count}</p>
}