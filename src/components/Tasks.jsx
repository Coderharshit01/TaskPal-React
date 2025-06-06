import { X,Plus, Search } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Tasks({ isLightTheme }) {
  const [filter, setFilter] = useState("all");
    const [task,setTask] = useState([])
    const [isTaskModal , setTaskModal] = useState(false)
  return (
    <div
      className={`flex flex-col flex-1 w-full h-full ${
        isLightTheme ? "text-black" : "text-white"
      }`}
    >
      <div className={`flex flex-col w-full px-8 py-6 gap-6 ${isLightTheme ? "bg-slate-100" :"bg-black"}`}>
        {/* Header */}
        <div className="flex w-full justify-between items-start">
          <h2 className="text-3xl font-bold leading-tight">
            Tasks
            <span className="block text-base font-light mt-1">
              Manage your tasks
            </span>
          </h2>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-br
           from-blue-600 via-cyan-600 to-purple-700 hover:opacity-80 transition" 
           onClick={()=> setTaskModal(true)}>
            <Plus size={18} /> New Task
          </button>
        </div>

        {/* Controls */}
        <div className="flex w-full justify-between items-center flex-wrap gap-4">
          {/* Search input */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search tasks"
              className={`pl-10 pr-4 py-2 w-full rounded-md text-sm bg-transparent border ${
                isLightTheme ? "border-gray-300" : "border-gray-600"
              } focus:outline-none focus:ring-2 ${
                isLightTheme ? "focus:ring-blue-400" : "focus:ring-cyan-500"
              }`}
            />
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2">
            {["all", "pending", "completed"].map((type) => {
              const isActive = filter === type;
              const baseStyle =
                "px-4 py-1.5 rounded-md text-sm font-medium transition";

              const lightThemeStyle = isActive
                ? "bg-blue-300 text-black"
                : "bg-gray-200 hover:bg-blue-200 text-black";

              const darkThemeStyle = isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-700 hover:bg-blue-700 text-white";

              return (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`${baseStyle} ${
                    isLightTheme ? lightThemeStyle : darkThemeStyle
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
 {isTaskModal && (
  <div className="flex z-50 fixed inset-0 items-center justify-center  ">
    <div className=" inset-0 absolute bg-black/30 backdrop-blur-md" onClick={()=>setTaskModal(false)}></div>
    
  <motion.div
  initial={{opacity:0.2 , scale:0}}
  animate={{opacity:1 , scale:1}}
  exit={{opacity:0.4 , scale:0.4}}
  transition={{duration:0.4 , ease:"circInOut"}}
  className={`md:w-96 relative w-80 z-50 ${
    isLightTheme ? "bg-white text-black" : "bg-gray-800 text-white/50"
  } gap-6 flex flex-col py-6 px-5 items-center shadow-xl rounded-xl justify-center `}>

   <div className="flex justify-between items-center w-full">
   <h2 className="text-cyan-500 text-xl font-bold">Add Task</h2>
   <button className="absolute top-3 right-2" onClick={()=> setTaskModal(false)}>
   < X size={22} />
   </button>
   </div>
  </motion.div>
  </div>

 )}

    </div>
  );
}
