import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import { Provider } from './components/ui/provider.jsx'
import { defaultSystem } from "@chakra-ui/react"

createRoot(document.getElementById('root')).render(
  <Provider value={defaultSystem}>
      <App title="Weather App"/>
  </Provider>

)
