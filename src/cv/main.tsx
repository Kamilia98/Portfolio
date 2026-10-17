import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/wdth.css'
import '../styles/tokens.css'
import '../styles/base.css'
import './cv.css'
import { CvDocument } from './CvDocument'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CvDocument />
  </StrictMode>,
)
