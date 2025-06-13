import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css' // ✅ Importa el archivo global
import App from './App'
import { ThemeProvider } from './components/ThemeProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light">
      <App />
    </ThemeProvider>
  </React.StrictMode>
)