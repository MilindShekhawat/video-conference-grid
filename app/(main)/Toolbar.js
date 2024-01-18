import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { Video } from "lucide-react"
import { VideoOff } from "lucide-react"
import { Mic } from "lucide-react"
import { MicOff } from "lucide-react"

export default function Toolbar() {
    const [camera, setCamera] = useState(true)
    const [microphone, setMicrophone] = useState(true)

    function handleCamera() {
        setCamera(!camera)
        console.log("camera", camera)
    }
    function handleMicrophone() {
        setMicrophone(!microphone)
    }

    return (
        <div className="flex justify-center p-2 rounded-lg min-h-16 bg-neutral-700">
            <ToggleGroup
                size={"lg"}
                type="multiple"
                variant="outline"
                className="flex gap-3">
                <ToggleGroupItem
                    value="camera"
                    aria-label="Toggle camera"
                    onClick={() => handleCamera()}>
                    {camera ? (
                        <Video className="w-4 h-4" />
                    ) : (
                        <VideoOff className="w-4 h-4" />
                    )}
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="microphone"
                    aria-label="Toggle microphone"
                    onClick={() => handleMicrophone()}>
                    {microphone ? (
                        <Mic className="w-4 h-4" />
                    ) : (
                        <MicOff className="w-4 h-4" />
                    )}
                </ToggleGroupItem>
            </ToggleGroup>
        </div>
    )
}
