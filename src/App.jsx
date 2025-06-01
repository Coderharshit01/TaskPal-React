import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Header from './components/Header'
import './style.css';

function App() {
  const [isLightTheme, setLightTheme] = useState(false)

  return (
    <div className={`flex flex-col min-h-screen ${!isLightTheme ? "bg-gray-900" : "bg-white"}`}>
      <Header setLightTheme={setLightTheme} isLightTheme={isLightTheme} />
    </div>
  )
}

export default App
