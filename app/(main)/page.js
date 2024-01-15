"use client"
import Link from "next/link"
import SideArea from "./SideArea"
import Grid from "./Grid"

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

import Toolbar from "./Toolbar"

export default function Home() {
    return (
        <main className="flex h-full text-white bg-neutral-800">
            <ResizablePanelGroup direction="horizontal">
                <ResizablePanel
                    defaultSize={75}
                    className="flex flex-col justify-between flex-1 p-2">
                    <div className="p-3 rounded-lg bg-neutral-700">
                        <Link href="/">Home</Link>
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
