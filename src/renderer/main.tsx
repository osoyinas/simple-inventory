import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'Components/App.tsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { Update } from 'Components/Update.tsx'
window.ipcRenderer.on('update-available', (_event, payload)=> {
    window.document.getElementById('loader-container')?.classList.add('hidden')
    window.document.getElementById('loader-container')?.remove()
    console.log(payload);
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <HashRouter>
                <Update version={payload as string}/>
            </HashRouter>
        </React.StrictMode>
    )
})


window.ipcRenderer.on('update-not-available', ()=> {
    window.document.getElementById('loader-container')?.classList.add('hidden')
    window.document.getElementById('loader-container')?.remove()
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <HashRouter>
                <App />
            </HashRouter>
        </React.StrictMode>
    )
})


