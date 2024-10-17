import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { Provider } from './components/ui/provider.jsx'
import { defineConfig, createSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
const config = defineConfig({
  theme: {
    colors: {},
    initialColorMode: 'light',
  },
})

const system = createSystem(config)

createRoot(document.getElementById('root')).render(
  <Provider value={system}>
    <ThemeProvider>
      <App title="Weather App"/>
    </ThemeProvider>
  </Provider>

)
