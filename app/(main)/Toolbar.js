import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import { Video } from "lucide-react"
import { VideoOff } from "lucide-react"
import { Mic } from "lucide-react"
import { MicOff } from "lucide-react"
import { MonitorUp } from "lucide-react"
import { MonitorX } from "lucide-react"
import { PhoneOff } from "lucide-react"

export default function Toolbar() {
    const [camera, setCamera] = useState(true)
    const [microphone, setMicrophone] = useState(true)
    const [screenShare, setScreenShare] = useState(true)

    return (
        <div className="flex justify-center p-2 rounded-lg min-h-16 bg-neutral-700">
            <ToggleGroup
                size={""}
                type="multiple"
                variant="outline"
                className="flex gap-3">
                <ToggleGroupItem
                    value="camera"
                    aria-label="Toggle camera"
                    className="rounded-full"
                    onClick={() => setCamera(!camera)}>
                    {camera ? (
                        <Video className="w-4 h-4" />
                    ) : (
                        <VideoOff className="w-4 h-4" />
                    )}
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="microphone"
                    aria-label="Toggle microphone"
                    className="rounded-full"
                    onClick={() => setMicrophone(!microphone)}>
                    {microphone ? (
                        <Mic className="w-4 h-4" />
                    ) : (
                        <MicOff className="w-4 h-4" />
                    )}
                </ToggleGroupItem>
                <ToggleGroupItem
                    value="screenShare"
                    aria-label="Toggle screenShare"
                    className="rounded-full"
                    onClick={() => setScreenShare(!screenShare)}>
                    {screenShare ? (
                        <MonitorUp className="w-4 h-4" />
                    ) : (
                        <MonitorX className="w-4 h-4" />
                    )}
                </ToggleGroupItem>
                <Button variant="destructive" className="text-red-200 rounded-full">
                    <PhoneOff className="w-4 h-4" />
                </Button>
            </ToggleGroup>
        </div>
    )
}
