import React, { useEffect, useState } from "react"
import { useResizeDetector } from "react-resize-detector"

export default function Grid() {
    // Aspect ratio 16:9
    // 1.78:1 Or 1:0.56
    const { width, height, ref } = useResizeDetector()
    const [videoSize, setVideoSize] = useState({
        videoWidth: width,
        videoHeight: height,
    })

    const elements = 2
    const videoHeight = Math.floor(height)
    const videoWidth = Math.floor(videoHeight * 1.78)

    //Total videos height is set to fit the container height
    function resizeByHeight(video_height, _elements) {
        video_height = height / _elements
        const video_width = Math.floor(video_height * 1.78)
        const _size = { videoWidth: video_width, videoHeight: video_height }
        console.log("resizeByHeight", _size)
        return _size
    }
    //Total videos width is set to fit the container width
    function resizeByWidth(video_width, _elements) {
        video_width = width / _elements
        const video_height = Math.floor(video_width * 0.56)
        const _size = { videoWidth: video_width, videoHeight: video_height }
        console.log("resizeByWidth", _size)
        return _size
    }

    function calcVideoSize() {
        const rows = 2
        const columns = 2
        let resizedByHeight = resizeByHeight(videoHeight, rows)
        let resizedByWidth = resizeByWidth(videoWidth, columns)
    }

    useEffect(() => {
        calcVideoSize()
    }, [width, height])

    return (
        <div
            ref={ref}
            className="relative flex flex-wrap items-center content-center justify-center flex-grow gap-4 py-4 overflow-hidden border-2 border-dashed border-stone-500">
            {Array.from({ length: elements }, (_, i) => (
                <div
                    key={i}
                    className="border-2 border-dashed rounded-lg aspect-video bg-stone-700"
                    style={{
                        minWidth: `${videoSize.videoWidth - 10}px`,
                        minHeight: `${videoSize.videoHeight - 10}px`,
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
