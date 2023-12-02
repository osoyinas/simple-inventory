import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'Components/App.tsx'
import './index.css'
import { HashRouter } from 'react-router-dom'





window.document.getElementById('loader-container')?.classList.add('hidden')
setTimeout(() =>{
    window.document.getElementById('loader-container')?.remove()
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <HashRouter>
                <App />
            </HashRouter>
        </React.StrictMode>
    )
}, 300)


