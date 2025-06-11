// PomodoroWidget.jsx
import { usePomodoro } from "./usePomodoro";
import { Play, Pause } from "lucide-react";

export default function PomodoroWidget() {
  const {
    timer,
    isTimer,
    isBreak,
    start,
    stop,
    reset,
    sessionsLeft,
    totalSessions,
  } = usePomodoro(25, 5, 4);

  return (
    <div className="text-white space-y-3 flex items-center justify-center flex-col">
      <h3 className="text-2xl font-bold">
        {isBreak ? "Break" : "Focus"} Time
      </h3>
      <p className="text-4xl font-mono">
        {`${String(timer.minutes).padStart(2, "0")}:${String(
          timer.seconds
        ).padStart(2, "0")}`}
      </p>
      <p className="text-sm">
        Session: {totalSessions - sessionsLeft + 1} / {totalSessions}
      </p>
      <div className="flex gap-6">
        <button onClick={isTimer ? stop : start}>
          {isTimer ? <Pause /> : <Play />}
        </button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
