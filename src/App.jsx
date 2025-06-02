import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Header from './components/Header'
import './style.css';
import Dashboard from './components/DashBoard';
import SideBar from './components/SideBar';
import Tasks from './components/Tasks';
import Ai_page from './components/ai_page';
import { Settings } from 'lucide-react';
import Pomodoro from './components/Pomodoro';
import Setting from './components/Settings';

function App() {
  const [isLightTheme, setLightTheme] = useState(false)

  return (
    <div className={`flex flex-col min-h-screen ${!isLightTheme ? "bg-gray-900" : "bg-white"}`}>
      <Header setLightTheme={setLightTheme} isLightTheme={isLightTheme} />
      <div className="flex flex-1">
        <SideBar isLightTheme={isLightTheme}/>
        <div className="flex flex-1">
          <Routes>
            <Route path='/' element={<Dashboard/>}  />
            <Route path='/tasks' element={<Tasks/>}  />
            <Route path='/ai' element={<Ai_page/>}  />
            <Route path='/settings' element={<Setting/>}  />
            <Route path='/pomodoro' element={<Pomodoro/>}  />


          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
