import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/globals.css"
import "@fontsource-variable/inter/index.css"
import App from './App.tsx'
import { ThemeProvider } from '#components/theme-provider'
import { AuthProvider } from './contexts/auth-context'
import { NotificationRealtimeProvider } from './contexts/notification-realtime-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NotificationRealtimeProvider>
          <ThemeProvider>
              <App /> 
          </ThemeProvider>
        </NotificationRealtimeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
