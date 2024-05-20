import {cols, gridRowHeight} from "@/lib/constants";
import RenderCounter from "@/app/counter/[id]/RenderCounter";
import {getCounter, getCounterLayout} from "@/app/fetcher";

type SectionProps = {
    items: {
        item: Awaited<ReturnType<typeof getCounter>>
        itemLayout: Awaited<ReturnType<typeof getCounterLayout>>
    }[]
}

export default async function Section({items}: SectionProps) {
    if (!items || items.length === 0)
        return null;

    // decide if mobile or desktop
    // const userAgent = headers().get("user-agent");
    // const {isMobile} = getSelectorsByUserAgent(userAgent ?? "")

    const calculateGridHeight = () => {
        return items.reduce((maxHeight, item) => {
            if (!item.item || !item.itemLayout) return maxHeight;

            const bottomRow = item.itemLayout.y + item.itemLayout.h;
            return Math.max(maxHeight, bottomRow);
        }, 0);
    };

    const gridHeight = calculateGridHeight();

    return <div className={"section-content w-full relative grid"} style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${gridHeight}, ${gridRowHeight}px)`,
        rowGap: `6px`,
        columnGap: `6px`,
    }}>
        {/*<p>{isMobile ? "mobile" : "desktop"}</p>*/}
        {items.map(({item, itemLayout}) => {
            if (!item || !itemLayout) return null;

            return <div key={item.id} id={item.id + "-inside"} className={"flex flex-col text-base h-full w-full"}
                        style={{
                            gridArea: `${itemLayout.y + 1} / ${itemLayout.x + 1} / span ${itemLayout.h} / span ${itemLayout.w}`,
                        }}>
                <RenderCounter key={item.id} counter={item}/>
            </div>
        })}
    </div>
}