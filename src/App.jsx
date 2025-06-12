import { useEffect, useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Header from './components/Header'
import './style.css';
import Dashboard from './components/DashBoard';
import SideBar from './components/SideBar';
import Tasks from './components/Tasks';
import Pomodoro from './components/Pomodoro';


function App() {
  const [isLightTheme, setLightTheme] = useState(false)
  const [task, setTask] = useState(() => {
    try {
      const stored = localStorage.getItem("tasks");
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.log("Failed to parse tasks:", e);
      return [];
    }
  });
  
  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);
  

  return (
    <div className={`flex flex-col min-h-screen ${!isLightTheme ? "bg-gray-900" : "bg-white"}`}>
      <Header setLightTheme={setLightTheme} isLightTheme={isLightTheme} />
      <div className="flex flex-1  ">
     
        <SideBar isLightTheme={isLightTheme} />
        <div className="flex flex-1 ">  
          <Routes>
            <Route path='/' element={<Dashboard isLightTheme={isLightTheme} tasks={task}/>}  />
            <Route path='/tasks' element={<Tasks isLightTheme={isLightTheme} setTask={setTask} tasks={task}/>}  />
            
            <Route path='/pomodoro' element={<Pomodoro isLightTheme={isLightTheme}/>}  />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
