import { useEffect, useState } from "react";
import { Settings } from "lucide-react";

export default function Header({setLightTheme,isLightTheme}) {
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
  
  const toggleTheme = ()=> {
    setToggle(!isToggle)
    setLightTheme(!isLightTheme)
  }

  return (
    <div className={`flex items-center p-4  justify-around ${!isLightTheme ? "dark-mode-head" : "light-mode-head"}`}>
      <div className="w-[25%]">
        <h2 className="text-2xl font-bold ">
          Task<span className="text-blue-500">Pal</span> -
          <span className="italic font-light"> “Your Productivity Ally”</span>
        </h2>
      </div>

      <div className="w-[40%] flex items-center justify-between">
        <h2 className="text-xl text-center md:text-xl font-semibold">
          {currTime?.Cdate} - {currTime?.Ctime}
        </h2>
      </div>

      <div className="flex gap-3 items-center">
        <button className="p-1">
          <Settings className="hover:opacity-65 md:w-8 md:h-8 w-7 h-7" />
        </button>

        {/* Toggle Button */}
        <button
          onClick={() => toggleTheme()}
          className={`w-16 h-9 rounded-full p-1 transition-colors duration-300 ${isLightTheme? 'bg-black' : 'bg-gray-100'}`}
        >
          <div
            className={`w-8 h-7 ${!isToggle ? "bg-black" : "bg-white"} rounded-full text-center shadow-md transform transition-transform duration-300 ${
              isToggle ? 'translate-x-7' : 'translate-x-0'
            }`}
          > {!isToggle ? "🌙":"☀️"}</div>
        </button>
      </div>
    </div>
  );
}
