import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "./SettingsContext";

const red = "#f54e4e";
const green = "#4aec8c";

function Timer(props) {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [mode, setMode] = useState("work"); // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(props.currentCycle);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);
  const currentCycleRef = useRef(currentCycle);

  const handleCycleChange = (event) => {
    const selectedCycle=parseInt(event.target.value);
    console.log(currentCycle);
    setCurrentCycle(selectedCycle);
  };

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
        
        
            const nextMode = modeRef.current === "work" ? "break" :"work" ;
            const nextSeconds =
              (nextMode === "work"
                ? settingsInfo.workMinutes
                : settingsInfo.breakMinutes) * 60;
      
            setMode(nextMode);
            modeRef.current = nextMode;
      
            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;

            if (nextMode === "break" && nextSeconds === 0 && currentCycleRef.current === 1) {
                setIsPaused(true);
                isPausedRef.current = true;
                return;
              }
      
            if(currentCycleRef.current === settingsInfo.cycles * 2){
              setIsPaused(true);
              isPausedRef.current=true;
              return;
            }
      
            if (currentCycleRef.current < settingsInfo.cycles * 2) {
              setCurrentCycle((prevCycle) => prevCycle + 1);
              currentCycleRef.current += 1;
            }
        }
    
    

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
    currentCycleRef.current = 1;

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      } else if (secondsLeftRef.current === 0) {
        console.log(modeRef.current);
        return switchMode();
      } else {
        tick();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds = mode === "work"
    ? settingsInfo.workMinutes * 60
    : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div>
        
      <CircularProgressbar
        value={percentage}
        text={minutes + ":" + seconds}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: mode === "work" ? red : green,
          tailColor: "rgba(255,255,255,.2)",
        })}
      />


    
      <div style={{ marginTop: "20px" }}>
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}

<div
          style={{
            position: "absolute",
            right:0,
            top:'50%',
            transform: 'translateY(-50%)',
            marginRight: "10px",
          }}
        >
          <select
            style={{
              backgroundColor: "#fff",
              borderRadius: "20px",
              padding: "5px 10px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
            }}
            value={currentCycle}
            onChange={handleCycleChange}
          >
            <option value={1}>Cycle 1</option>
            <option value={2}>Cycle 2</option>
            <option value={3}>Cycle 3</option>
          </select>
        </div>

        
        
      </div>
      
    </div>
  );
}

export default Timer;