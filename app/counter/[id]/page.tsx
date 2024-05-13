import ViewCounter from "@/app/counter/[id]/ViewCounter";

export const dynamic = "force-static";

type CounterPageProps = {
    params: {
        id: string
    }
}

export default async function CounterPage({params: {id}}: CounterPageProps) {
    return <ViewCounter domain={id}/>
}