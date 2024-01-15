import React, { useEffect, useState } from "react"
import { useResizeDetector } from "react-resize-detector"

export default function Grid() {
    // Aspect ratio 16:9
    // 1.78:1 Or 1:0.56
    const { width, height, ref } = useResizeDetector()
    const [videoSize, setVideoSize] = useState({
        videoWidth: 0,
        videoHeight: 0,
    })

    const elements = 3

    //Total videos width is set to fit the container width
    function resizeByWidth(video_width, columns = 1) {
        video_width = width / columns
        const video_height = Math.floor(video_width * 0.56)
        const _size = { videoWidth: video_width, videoHeight: video_height }
        // console.log("resizeByWidth", _size)
        return _size
    }
    //Total videos height is set to fit the container height
    function resizeByHeight(video_height, rows = 1) {
        video_height = height / rows
        const video_width = Math.floor(video_height * 1.78)
        const _size = { videoWidth: video_width, videoHeight: video_height }
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
                resizedByWidth = resizeByWidth(width, columns)
                resizedByHeight = resizeByHeight(height, rows)

                // //--------------------------------------------------------------------
                // console.log("-------------------------------------------------------")
                // console.log("Container:", width, height)
                // console.log("%cResizedByWidth:", "background: yellow", resizedByWidth)
                // console.log("%cResizedByHeight:", "background: cyan", resizedByHeight)
                // console.log("Columns:", columns, "Rows:", rows)
                // console.log(
                //     "%cTotal size by Width:",
                //     "background: yellow",
                //     resizedByWidth.videoWidth * columns,
                //     resizedByWidth.videoHeight * rows
                // )
                // console.log(
                //     "%cTotal size by Height:",
                //     "background: cyan",
                //     resizedByHeight.videoWidth * columns,
                //     resizedByHeight.videoHeight * rows
                // )
                // //--------------------------------------------------------------------

                //if container is bigger than videos resized to fit by height
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
                //if container is bigger than videos resized to fit by width
                if (height >= resizedByWidth.videoHeight * rows) {
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
                setVideoSize({ videoWidth: maxVideoWidth, videoHeight: maxVideoHeight })
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            calcVideoSize()
        }, 500)
    }, [width, height])

    return (
        <div
            ref={ref}
            className="relative flex flex-wrap items-center content-center justify-center flex-grow gap-3 py-4 overflow-hidden border-2 border-dashed border-stone-500">
            {Array.from({ length: elements }, (_, i) => (
                <div
                    key={i}
                    className="border-2 border-dashed rounded-lg aspect-video bg-stone-700"
                    style={{
                        minWidth: "120px",
                        minHeight: "120px",
                        width: `${videoSize.videoWidth - 12}px`,
                        height: `${videoSize.videoHeight - 12}px`,
                    }}>
                    <div className="flex flex-col items-center justify-center h-full mx-auto">
                        <div>{i + 1}</div>
                        <div>{`${videoSize.videoWidth}x${videoSize.videoHeight}`}</div>
                    </div>
                </div>
            ))}
            <div className="absolute bottom-0 right-0">
                {`${width}x${height}`}
                {/* <button onClick={() => calcVideoSize()}>Shift</button> */}
            </div>
        </div>
    )
}
