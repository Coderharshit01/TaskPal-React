import { Pause, Play, Settings2Icon , TimerReset } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
export default function Pomodoro({ isLightTheme }) {
  const [isTimer, setIsTimer] = useState(false);
  const [timer, setTimer] = useState({ minutes: 25, seconds: 0 });
  const intervalRef = useRef(null);
  const [isSetting,setSetting] = useState(false)
  // Start the timer
  const startTimer = () => {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      setTimer((prevTime) => {
        const { minutes, seconds } = prevTime;

        if (minutes === 0 && seconds === 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsTimer(false);
          return { minutes: 0, seconds: 0 };
        }

        if (seconds === 0) {
          return { minutes: minutes - 1, seconds: 59 };
        } else {
          return { minutes, seconds: seconds - 1 };
        }
      });
    }, 1000);
  };

  // Pause the timer
  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Toggle play/pause
  const handleTimer = () => {
    if (isTimer) {
      pauseTimer();
    } else {
      startTimer();
    }
    setIsTimer((prev) => !prev);
  };
  const resetTimer = ()=>{
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setTimer({minutes:25,seconds:0})
    setIsTimer(false)
  }

  return (
    <div className="flex flex-col items-center justify-between h-full p-6 w-full max-w-md mx-auto space-y-4">
      <h2 className="text-3xl font-bold italic tracking-wide text-pink-600">
        Pomodoro
      </h2>

      <div className="flex flex-col items-center justify-center flex-1 space-y-6">
        <div className="w-80 h-80 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-pink-600 shadow-xl flex items-center justify-center">
          <div
            className={`w-[88%] h-[88%] rounded-full flex items-center justify-center ${
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
  className="bg-white p-8 z-50"
  >

  </motion.div>
        </div>
      )}
    </div>
  );
}
