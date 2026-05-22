import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/globals.css"
import App from './App.tsx'
import { ThemeProvider } from '#components/theme-provider'
import { AuthProvider } from './contexts/auth-context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
          <App /> 
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
