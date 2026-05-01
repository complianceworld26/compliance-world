import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { GtagRouteTracker } from './components/GtagRouteTracker.jsx'
import WhatsAppChatButton from './components/WhatsAppChatButton.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <GtagRouteTracker />
        <AuthProvider>
          <App />
        </AuthProvider>
        <WhatsAppChatButton />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
