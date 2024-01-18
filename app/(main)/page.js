"use client"
import Grid from "./Grid"
import Toolbar from "./Toolbar"
import SideArea from "./SideArea"

import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Home() {
    return (
        <main className="flex h-full text-white bg-neutral-800">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    defaultSize={75}
                    className="flex flex-col justify-between flex-1 p-2">
                    <div className="relative p-1.5 rounded-lg min-h-11 bg-neutral-700">
                        <Button
                            className="absolute w-8 h-8 right-1"
                            onClick={() => showChat()}
                            size="icon"
                            variant="ghost">
                            <ChevronLeft className="w-5 h-5" />
                        </Button>
                    </div>
                    <Grid />
                    <Toolbar />
                </ResizablePanel>
                <ResizableHandle className="bg-neutral-400" withHandle />
                <ResizablePanel
                    defaultSize={25}
                    className="flex min-w-[15rem] max-w-[30rem]">
                    <SideArea />
                </ResizablePanel>
            </ResizablePanelGroup>
        </main>
    )
}
