import MainPage from "./components/MainPage"
import { ThemeProvider } from "./components/theme-provider"
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
