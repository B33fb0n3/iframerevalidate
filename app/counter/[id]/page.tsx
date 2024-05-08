import ViewCounter from "@/app/counter/[id]/ViewCounter";

export const dynamic = "force-static";

type CounterPageProps = {
    params: {
        id: string
    }
}

export default async function CounterPage({params: {id}}: CounterPageProps) {
    console.log("---View Counter Page---")
    return <ViewCounter counterId={id} />
}