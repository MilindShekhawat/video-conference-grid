import React, { useEffect, useMemo, useState } from "react"
import { useResizeDetector } from "react-resize-detector"

export default function Grid() {
    // Aspect ratio 16:9
    // 1.78:1 Or 1:0.56
    const { width, height, ref } = useResizeDetector()
    const [videoSize, setVideoSize] = useState({
        videoWidth: 0,
        videoHeight: 0,
    })

    const elements = 2
    const isPinned = 0

    //Total videos width is set to fit the container width
    function resizeByWidth(video_width, columns = 1) {
        video_width = width / columns
        const video_height = video_width * 0.56
        const _size = {
            videoWidth: Math.floor(video_width),
            videoHeight: Math.floor(video_height),
        }
        // console.log("resizeByWidth", _size)
        return _size
    }
    //Total videos height is set to fit the container height
    function resizeByHeight(video_height, rows = 1) {
        video_height = height / rows
        const video_width = video_height * 1.78
        const _size = {
            videoWidth: Math.floor(video_width),
            videoHeight: Math.floor(video_height),
        }
        // console.log("resizeByHeight", _size)
        return _size
    }

    function calcVideoSize() {
        let rows = elements
        let resizedByWidth = resizeByWidth(width)
        let resizedByHeight = resizeByHeight(height)
        let maxVideoWidth = 0
        let maxVideoHeight = 0

        //Loop elements times to find the best rows x columns combination
        for (let columns = 1; columns <= elements; columns++) {
            rows = Math.ceil(elements / columns)

            //Run logic if the container smaller than the total videos size
            if (
                width <= resizedByWidth.videoWidth * columns ||
                height <= resizedByHeight.videoHeight * rows
            ) {
                //STORE- Resize videos to fit the container by width and height
                resizedByWidth = resizeByWidth(width, columns)
                resizedByHeight = resizeByHeight(height, rows)

                //if container is bigger than videos resized to fit by height, use that size
                if (width >= resizedByHeight.videoWidth * columns) {
                    maxVideoWidth = resizedByHeight.videoWidth
                    maxVideoHeight = resizedByHeight.videoHeight
                    console.log(
                        "%cresizedByHeight",
                        "background: cyan; font-size: 1rem",
                        maxVideoWidth,
                        maxVideoHeight
                    )
                }
                //if container is bigger than videos resized to fit by width, compare with previous size
                if (height >= resizedByWidth.videoHeight * rows) {
                    //choose the bigger size
                    if (resizedByWidth.videoWidth > maxVideoWidth) {
                        maxVideoWidth = resizedByWidth.videoWidth
                        maxVideoHeight = resizedByWidth.videoHeight
                        console.log(
                            "%cresizedByWidth",
                            "background: yellow; font-size: 1rem",
                            maxVideoWidth,
                            maxVideoHeight
                        )
                    }
                }
                setVideoSize({
                    videoWidth: maxVideoWidth,
                    videoHeight: maxVideoHeight,
                })
            }
        }
    }

    useMemo(() => {
        setTimeout(() => {
            calcVideoSize()
        }, 400)
    }, [width, height])

    return (
        <div
            className="flex flex-1 border-dashed border-1"
            style={{ height: `${height}px`, minHeight: `${height}px` }}>
            {isPinned ? (
                <div className="flex flex-wrap items-center flex-1 object-contain border-1 basis-3/5">
                    <div
                        className="p-[6px] flex-1 aspect-video"
                        style={{ maxHeight: `${height}px` }}>
                        <div className="flex flex-col items-center justify-center h-full mx-auto rounded-lg bg-neutral-700">
                            <div className="flex flex-col items-center justify-center rounded-full h-1/2 bg-neutral-600 aspect-square"></div>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}

            <div
                ref={ref}
                className="relative flex flex-wrap content-center justify-center flex-1 border-1 basis-0 min-w-40 py-[6px]">
                {Array.from({ length: elements }, (_, i) => (
                    <div
                        key={i}
                        className="flex-1 p-[6px] transition-all duration-300 ease-in-out"
                        style={{
                            minWidth: `${videoSize.videoWidth * 0.85}px`,
                            width: `${videoSize.videoWidth}px`,
                            maxWidth: `${videoSize.videoWidth}px`,
                            height: `${videoSize.videoHeight}px`,
                            maxHeight: `${videoSize.videoHeight}px`,
                        }}>
                        <div className="flex flex-col items-center justify-center h-full mx-auto rounded-lg bg-neutral-700">
                            <div className="flex flex-col items-center justify-center rounded-full h-1/2 bg-neutral-600 aspect-square">
                                {i + 1}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="absolute bottom-0 right-0">
                    {`${width}x${height}`}
                    {/* <button onClick={() => calcVideoSize()}>Shift</button> */}
                </div>
            </div>
        </div>
    )
}
