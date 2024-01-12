import React, { useEffect, useState } from "react"
import { useResizeDetector } from "react-resize-detector"

export default function Grid() {
    // Aspect ratio 16:9
    // 1.78:1 Or 1:0.56
    const { width, height, ref } = useResizeDetector()
    const [columns, setColumns] = useState(1)
    const [size, setSize] = useState({
        width: 1.78 * 200,
        height: 200,
    })
    const elements = 2

    function calculateColumns(elements) {
        if (elements < 3) {
            setColumns(elements)
        } else if (elements < 10) {
            setColumns(3)
        } else if (elements < 12) {
            setColumns(4)
        } else {
            setColumns(5)
        }
    }

    // useEffect(() => {
    //     calculateColumns(elements);
    //     console.log(elements, columns);
    // }, []);

    function handleLayoutShift() {
        setSize({ width: width / 2, height: height / 2 })
    }
    return (
        <div
            ref={ref}
            className="relative flex flex-wrap content-center justify-center flex-grow gap-4 py-4 overflow-hidden border-2 border-dashed border-stone-500">
            {Array.from({ length: elements }, (_, i) => (
                <div
                    key={i}
                    className="border-2 border-dashed rounded-lg aspect-video bg-stone-700"
                    style={{ width: `${size.width - 8}px` }}>
                    <div className="flex flex-col items-center justify-center h-full mx-auto">
                        <div>{i + 1}</div>
                        <div>{`${size.width}x${size.height}`}</div>
                    </div>
                </div>
            ))}
            <div className="absolute bottom-0 right-0">
                {`${width}x${height}`}
                <button onClick={() => handleLayoutShift()}>Shift</button>
            </div>
        </div>
    )
}
