import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './components/app/App'

const container = document.getElementById('root')
const root = createRoot(container as Element | DocumentFragment)
root.render(<App />)
