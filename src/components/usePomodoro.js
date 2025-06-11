import { useEffect, useRef, useState } from "react";

export function usePomodoro(initial = 25, breakMin = 5, sessions = 1) {
  const [isTimer, setIsTimer] = useState(false);
  const [timer, setTimer] = useState({ minutes: initial, seconds: 0 });
  const [isBreak, setIsBreak] = useState(false);
  const [totalSessions, setTotalSessions] = useState(sessions);
  const [sessionsLeft, setSessionsLeft] = useState(sessions);
  const intervalRef = useRef(null);

  const initialTimeRef = useRef({ minutes: initial, seconds: 0 });
  const isBreakRef = useRef(isBreak);
  const sessionLeftRef = useRef(sessionsLeft);

  useEffect(() => {
    isBreakRef.current = isBreak;
    sessionLeftRef.current = sessionsLeft;
  }, [isBreak, sessionsLeft]);

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        let { minutes, seconds } = prev;
        if (minutes === 0 && seconds === 0) {
          if (isBreakRef.current) {
            if (sessionLeftRef.current <= 1) {
              stop();
              setIsBreak(false);
              return { ...initialTimeRef.current };
            } else {
              setSessionsLeft((prev) => prev - 1);
              setIsBreak(false);
              return { ...initialTimeRef.current };
            }
          } else {
            setIsBreak(true);
            return { minutes: breakMin - 1, seconds: 59 };
          }
        }
        if (seconds === 0) return { minutes: minutes - 1, seconds: 59 };
        return { minutes, seconds: seconds - 1 };
      });
    }, 1000);
    setIsTimer(true);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsTimer(false);
  };

  const reset = () => {
    stop();
    setIsBreak(false);
    setTimer({ ...initialTimeRef.current });
    setSessionsLeft(totalSessions);
  };

  return {
    isTimer,
    isBreak,
    timer,
    start,
    stop,
    reset,
    sessionsLeft,
    totalSessions,
    setTotalSessions,
  };
}
