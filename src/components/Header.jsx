import { useEffect, useState } from "react";
import { Settings, Menu, X } from "lucide-react";

export default function Header({ setLightTheme, isLightTheme , setSideBar, isSideBar }) {
  const [currTime, setCurrTime] = useState(null);
  const [isToggle, setToggle] = useState(false);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const time = date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      const today = `${days[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
      setCurrTime({ Ctime: time, Cdate: today });
    };

    updateTime(); // initial call
    const intervalId = setInterval(updateTime, 60000); // update every 60 sec

    return () => clearInterval(intervalId); // cleanup
  }, []);

  const toggleTheme = () => {
    setToggle(!isToggle);
    setLightTheme(!isLightTheme);
  };

  return (
    <header className={`flex items-center justify-between px-4 py-3 flex-wrap ${!isLightTheme ? "dark-mode-head" : "light-mode-head"}`}>
      {/* Menu Button (Left) */}
      <div className="flex items-center gap-3">
        <button className="md:hidden block p-1" onClick={(e)=>{
          e.stopPropagation()
          setSideBar(prev => !prev)
        }}>
          {isSideBar ? <X className="w-7 h-7"/> :  <Menu className="w-7 h-7" />}
        </button>

        {/* Logo and Tagline */}
        <h2 className="text-xl md:text-2xl font-bold">
          Task<span className="text-blue-500">Pal</span>
          <span className="italic font-light hidden sm:inline"> – “Your Productivity Ally”</span>
        </h2>
      </div>

      {/* Center: Date & Time (hidden on mobile) */}
      <div className="hidden md:flex items-center justify-center w-full md:w-auto mt-2 md:mt-0">
        <h2 className="text-base md:text-lg font-semibold">
          {currTime?.Cdate} – {currTime?.Ctime}
        </h2>
      </div>

      {/* Right: Theme Toggle */}
      <div className="flex gap-3 items-center mt-2 md:mt-0">
        <button
          onClick={toggleTheme}
          className={`w-16 h-9 rounded-full p-1 transition-colors duration-300 ${isLightTheme ? 'bg-black' : 'bg-gray-100'}`}
        >
          <div
            className={`w-8 h-7 ${!isToggle ? "bg-black" : "bg-white"} rounded-full text-center shadow-md transform transition-transform duration-300 ${
              isToggle ? 'translate-x-7' : 'translate-x-0'
            }`}
          >
            {!isToggle ? "🌙" : "☀️"}
          </div>
        </button>
      </div>
    </header>
  );
}
