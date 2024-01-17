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

    useEffect(() => {
        setTimeout(() => {
            calcVideoSize()
        }, 400)
    }, [width, height])

    return (
        <div
            ref={ref}
            className="relative flex flex-wrap content-center justify-center flex-grow my-2 overflow-hidden overflow-x-hidden">
            {Array.from({ length: elements }, (_, i) => (
                <div
                    key={i}
                    className="flex-1 p-[6px] transition-all duration-300 ease-in-out"
                    style={{
                        minWidth: `${videoSize.videoWidth * 0.8}px`,
                        width: `${videoSize.videoWidth}px`,
                        maxWidth: `${videoSize.videoWidth}px`,
                        minHeight: `100px`,
                        height: `${videoSize.videoHeight}px`,
                        maxHeight: `${videoSize.videoHeight}px`,
                    }}>
                    <div className="flex flex-col items-center justify-center h-full mx-auto rounded-lg bg-neutral-700">
                        <div>{i + 1}</div>
                        {/* <div>{`${videoSize.videoWidth}x${videoSize.videoHeight}`}</div> */}
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
