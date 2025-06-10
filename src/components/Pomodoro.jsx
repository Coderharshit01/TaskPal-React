import { Pause, Play, Settings2Icon , TimerReset, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
export default function Pomodoro({ isLightTheme }) {
  const [isTimer, setIsTimer] = useState(false);
  const [timer, setTimer] = useState({ minutes: 25, seconds: 0 });
  const [isBreak, setIsBreak] = useState(false)
  const [breakTime,setBreakTime] = useState(1)
  const intervalRef = useRef(null);
  const [isSetting,setSetting] = useState(false)
  const [timerMin,setTimerMin] = useState(25)
  const [breakMin , setBreakMin] = useState(5)
  const [totalSessions, setTotalSessions] = useState(1);
  const [sessionsLeft, setSessionsLeft] = useState(1);
  
 // ✅ Store original work time here (to reset after break)
 const initialTimeRef = useRef({ minutes: 25, seconds: 0 });

 // 🔁 Refs to hold latest values for interval access
 const isBreakRef = useRef(isBreak);
 const breakTimeRef = useRef(breakTime);
const sessionLeftRef = useRef(sessionsLeft)
 // Sync refs when state changes
 useEffect(() => {
   isBreakRef.current = isBreak;
 }, [isBreak]);

useEffect(()=>{
  sessionLeftRef.current = sessionsLeft;

},[sessionsLeft])

 useEffect(() => {
   breakTimeRef.current = breakTime;
 }, [breakTime]);

 const startTimer = () => {
  if (intervalRef.current !== null) return; // already running

  intervalRef.current = setInterval(() => {
    setTimer((prevTime) => {
      let { minutes, seconds } = prevTime;
      if (minutes === 0 && seconds === 0) {
        if (isBreakRef.current) {
          
          if (sessionLeftRef.current <= 1) {
            // 🔔 All sessions done
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsTimer(false);
            setIsBreak(false);
            alert("🎉 All Pomodoro sessions completed!");
            return { minutes: initialTimeRef.current.minutes, seconds: 0 };
          } else {
            const updatedSessions = sessionLeftRef.current - 1;
            setSessionsLeft(updatedSessions);
            setIsBreak(false);
            return {
              minutes: initialTimeRef.current.minutes,
              seconds: initialTimeRef.current.seconds,
            };
          }
        } else {
          // 🧠 Work session over, start break
          setIsBreak(true);
          return { minutes: breakTimeRef.current - 1, seconds: 59 };
        }
      }
      if(seconds == 0){
        return {minutes:minutes-1 , seconds:59}
      } else{
        return {minutes, seconds:seconds-1}
      }
    });
  }, 1000); // Added missing interval delay
};

 const resetTimer = () => {
   stopTimer();
   setIsBreak(false);
   setTimer({ ...initialTimeRef.current });
 };

 const stopTimer = () => {
  clearInterval(intervalRef.current);
  intervalRef.current = null;
  setIsTimer(false);
};

  // Pause the timer
  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);
  
  // Toggle play/pause
  const handleTimer = () => {
    if (isTimer) {
      pauseTimer();
    } else {
      startTimer();
    }
    setIsTimer((prev) => !prev);
  };


  const handleTimerMin = (min) => {
    const num = parseInt(min);
    if (!isNaN(num) && num>0) {
      setTimerMin(num);
    }else{
      setTimerMin(1)
    }
  };
  

  const saveData = (timerMin, breakMin,session) => {
    const parsedBreakMin = parseInt(breakMin);
    const parsedTimerMin = parseInt(timerMin);
  
    setTimer({ minutes: parsedTimerMin, seconds: 0 });
    initialTimeRef.current = { minutes: parsedTimerMin, seconds: 0 };
    setBreakTime(parsedBreakMin);
  
    setSessionsLeft(session);
    setTotalSessions(session);
    setIsBreak(false);
    setIsTimer(false);
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = null;
    setSetting(false)
    
  };
  
  
  return (
    <div className="flex flex-col items-center justify-between h-full p-6 w-full max-w-md mx-auto space-y-4">
      <h2 className="text-5xl font-bold italic tracking-wide text-pink-600">
      {isBreak ? "Break !!!" : "Pomodoro"}
      </h2>

      <div className="flex flex-col items-center justify-center flex-1 space-y-6">
        <div className="w-80 h-80 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600 shadow-xl flex items-center justify-center">
          <div
            className={`w-[88%] h-[88%] rounded-full flex flex-col gap-6 items-center justify-center ${
              isLightTheme ? "bg-white" : "bg-zinc-900"
            }`}
          >
            <h2
              className={`text-5xl font-bold ${
                isLightTheme ? "text-black" : "text-white"
              } tracking-wide`}
            >
              {timer.minutes.toString().padStart(2, "0").split('').join(' ')} : {timer.seconds.toString().padStart(2, "0").split('').join(' ')}
            </h2>
            {/* <h2 className="text-pink-500 text-xl font-bold"> {isBreak ? "Break" : "Pomodoro"}</h2> */}
            <p className="text-pink-500 font-semibold text-lg">
            Session: {Math.min(totalSessions - sessionsLeft + 1, totalSessions)} / {totalSessions}

</p>

          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
        <button className="p-3 rounded-full hover:bg-pink-200/30 transition" onClick={()=> resetTimer()}>
            <TimerReset className="w-7 h-7 text-pink-600" />
          </button>
          <button
            className="p-3 rounded-full hover:bg-pink-200/30 transition"
            onClick={handleTimer}
          >
            {!isTimer ? (
              <Play className="w-7 h-7 text-pink-600" />
            ) : (
              <Pause className="w-7 h-7 text-pink-600" />
            )}
          </button>
          <button className="p-3 rounded-full hover:bg-pink-200/30 transition" onClick={()=> setSetting(true)}>
            <Settings2Icon className="w-7 h-7 text-pink-600" />
          </button>
        </div>
      </div>
      {isSetting && (
         <div className="flex z-50 fixed inset-0 items-center justify-center  ">


         <div
           className=" inset-0 absolute bg-black/30 backdrop-blur-sm"
           onClick={() => setSetting(false)}
         ></div>
  <motion.div
  initial= {{opacity:0.2 , scale:0}}
  animate={{opacity:1,scale:1}}
  exit={{opacity:0.3 , scale:0.4}}
  transition={{duration:0.3 , ease:"circInOut"}} 
  className="bg-white p-3 z-50 w-96 rounded-xl shadow-2xl relative"
  >
   <div className="flex">
   <h2 className="text-blue-700 font-bold text-xl ">Pomodoro-Settings</h2>
   <button className="absolute top-2 right-2" onClick={()=> setSetting(false)}> <X size={22}/></button>
   </div>
    <div className="flex gap-3 flex-col p-3" >
     <div className=" flex flex-col   gap-1">
     <label htmlFor="mins"  className="text-gray-600 italic">Pomodoro-Minutes: (default:25min) </label>
      <input type="number" min={1} max={60} className="rounded-xl mx-auto shadow-2xl border w-[88%] hover:border-blue-400 focus:border-blue-600 outline-none p-2 text-center text-gray-700" placeholder="Eg: 30 ,40 "
       value={timerMin} onChange={(e)=> handleTimerMin(e.target.value)} onBlur={() => {
        if (timerMin < 1) setTimerMin(1);
      }}/>
     </div>
     <div className=" flex flex-col gap-1">
     <label htmlFor="break" className="text-gray-600 italic">Break: (5 by default) </label>
      <input type="number" min={1} max={20}  className="rounded-xl  mx-auto shadow-2xl border w-[88%] hover:border-blue-400 focus:border-blue-600 outline-none p-2 text-center text-gray-700" placeholder="Eg: 5,10 " 
      value={breakMin} onChange={(e) => {
        const num = parseInt(e.target.value);
        if (!isNaN(num) && num>0){ setBreakMin(num);} else {setBreakMin(5)}
      }}/>
     </div>
     <div className="flex flex-col   gap-1">
     <label htmlFor="sessions" className="text-gray-600 italic">No of Sessions: ( 1 by default) </label>
     <input type="number" 
  className="rounded-xl  mx-auto shadow-2xl border w-[88%] hover:border-blue-400 focus:border-blue-600 outline-none p-2 text-center text-gray-700"
  min={1}
  max={10}
  placeholder="Eg: 1,2 "
  value={totalSessions}
  onChange={(e) => {
    const num = parseInt(e.target.value);
    if (!isNaN(num) && num>0){ setTotalSessions(num);}else{setTotalSessions(1)}
  }}
/>

     </div>
     <div className="p-2 flex justify-around items-center">
        <button className="bg-green-500 text-white px-3 py-1 text-center  rounded-xl shadow-2xl hover:scale-105 hover:opacity-85"
        onClick={()=> saveData(timerMin,breakMin,totalSessions)}>Save</button>
        <button className="bg-gray-500 text-white px-3 py-1 text-center rounded-xl shadow-2xl hover:scale-105 hover:opacity-85" onClick={()=> setSetting(false)}>Cancel</button>
    </div>
    </div>
   
  </motion.div>
        </div>
      )}
    </div>
  );
} 
