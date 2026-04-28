import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThemeRoot from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeRoot></ThemeRoot>
  </StrictMode>,
)
