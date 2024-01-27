
import { useEffect } from "react";
import { LayoutContainer } from "./layout/LayoutContainer";
import  LinearProgressWithLabel  from "./LinearProgressWithLabel";
import React from "react";
export function Update( {version}: {version: string }) {
    const [progress, setProgress] = React.useState(0);
    useEffect(() => {
        window.ipcRenderer.on('download-progress', (_event, payload)=> {
            console.log(payload);
            setProgress(payload as number)
        })
    }, [progress])
    return (
        <main className="text-accent-content items-center relative">
            <LayoutContainer className="justify-center h-[100vh] ">
                <h1 className="text-4xl font-semibold">Descargando nueva actualización</h1>
                <h1 className="text-4xl font-bold">{version}</h1>
                <div className="w-1/2">
                    <LinearProgressWithLabel  value={progress}  />    
                </div>
                <h1 className="text-xl font-bold">El programa se reiniciará cuando termine. No cierres ni apagues el ordenador.</h1>
            </LayoutContainer>
        </main>
    );
}