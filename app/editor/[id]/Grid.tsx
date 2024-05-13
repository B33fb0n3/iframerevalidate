import React, {useMemo, useState} from "react";
import {cols, gridRowHeight} from "@/lib/constants";
import ReactGridLayout from 'react-grid-layout';

type GridProps = {
    items: {
        id: string,
        count: number
    }[]
}

export default function Grid({items}: GridProps) {
    const [gridVisible, setGridVisible] = useState(false);

    const margin: [number, number] = [6, 6];
    const gridWidth = vwToPx(100);

    const cellSize = useMemo(() => {
        const marginSlotsCount = cols - 1;
        const [horizontalMargin] = margin;
        const totalHorizontalMargin = marginSlotsCount * horizontalMargin;
        const freeSpace = gridWidth - totalHorizontalMargin;
        return {
            width: freeSpace / cols, height: gridRowHeight,
        };
    }, [cols, gridWidth, gridRowHeight, margin]);

    const background = useMemo(() => generateGridBackground({
        cellSize,
        margin,
        cols,
        gridWidth
    }), [cellSize, gridWidth, margin, cols]);

    const style = useMemo(() => ({
        width: gridWidth, background: gridVisible ? background : '',
    }), [gridWidth, gridVisible, background],);

    const children = useMemo(() => items.map((counter) => {
        return <p key={counter.id}>{counter.id}, {counter.count}</p>
    }), [gridVisible]);

    return <div className="block-grid relative">
        <ReactGridLayout
            className="z-10 relative"
            cols={cols}
            rowHeight={gridRowHeight}
            width={gridWidth}
            margin={margin}
            compactType={null}
            allowOverlap={true}
            resizeHandles={["s", "e", "se"]}
            preventCollision={true}
            containerPadding={[0, 0]}
            style={style}
            isDroppable
            onDropDragOver={(e) => {
                // todo: get from e the data and rezie the virtuell element
                return {w: 1, h: 1}
            }}
            onResizeStart={() => setGridVisible(true)}
            onResizeStop={(layout, oldItem, newItem) => {
                // setNewPositionAndSize(newItem)
                setGridVisible(false)
            }}
            onDragStart={(layout, oldItem, newItem) => {
                // setSelectedBlock(newItem)
                setGridVisible(true)
            }}
            onDragStop={(layout, oldItem, newItem) => {
                // setNewPositionAndSize(newItem)
                setGridVisible(false);
            }}
        >
            {children}
        </ReactGridLayout>
    </div>
}

type GenerateGridBackgroundProps = {
    cellSize: {
        height: number;
        width: number;
    }
    margin: [number, number]
    cols: number
    gridWidth: number
}

// https://github.com/metabase/metabase/blob/master/frontend/src/metabase/dashboard/components/grid/GridLayout.jsx#L10
function generateGridBackground({cellSize, margin, cols, gridWidth}: GenerateGridBackgroundProps) {
    const XMLNS = "http://www.w3.org/2000/svg";
    const [horizontalMargin, verticalMargin] = margin;
    const rowHeight = cellSize.height + verticalMargin;

    const y = 0;
    const w = cellSize.width;
    const h = cellSize.height;

    const rectangles = [...Array(cols)].map((i, index) => {
        const x = index * (cellSize.width + horizontalMargin);
        const isFirstOrSecondColumn = index % cols < 4;
        const isBeforeLastOrLastColumn = index % cols >= cols - 4;

        const opacity = isFirstOrSecondColumn || isBeforeLastOrLastColumn ? 0 : 0.1;

        return `<rect stroke='white' stroke-width='1' fill='black' x='${x}' y='${y}' width='${w}' height='${h}' rx="5" opacity="${opacity}"/>`;
    });

    const svg = [`<svg xmlns='${XMLNS}' width='${gridWidth}' height='${rowHeight}'>`, ...rectangles, `</svg>`,].join("");

    return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

function vwToPx(vw: number) {
    if (typeof window !== "undefined") {
        const screenWidth = (window.innerWidth) || (document.documentElement.clientWidth);
        return (vw * (screenWidth - 5)) / 100;
    } else
        return 0;
}