import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import ProjectShowcase from './components/ProjectShowcase'
import HomePage from './pages/HomePage'

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter basename={routerBasename}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:projectId" element={<ProjectShowcase />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
