import './App.css'
import { useState } from 'react'
import Settings from './components/Settings/Settings'
import Timer from './components/Timer/Timer'

const App = () => {

  const [openSetting, setOpenSetting] = useState(false);

  const [pomodoro, setPomodoro] = useState(25 * 60 * 1000);
  const [shortBreak, setShortBreak] = useState(5 * 60 * 1000);
  const [longBreak, setLongBreak] = useState(15 * 60 * 1000);
  const [autoBreak, setAutoBreak] = useState(false);
  const [autoPomo, setAutoPomo] = useState(false);

  return (
    <div className='app'>

      {
        openSetting &&
        <Settings 
          pomodoro={pomodoro} 
          setPomodoro={setPomodoro}
          shortBreak={shortBreak}
          setShortBreak={setShortBreak}
          longBreak={longBreak}
          setLongBreak={setLongBreak}
          autoBreak={autoBreak}
          setAutoBreak={setAutoBreak}
          autoPomo={autoPomo}
          setAutoPomo={setAutoPomo}
          setOpenSetting={setOpenSetting}
        />
      }

      <Timer
        pomodoro={pomodoro} 
        shortBreak={shortBreak}
        longBreak={longBreak}
        openSetting={openSetting}
        setOpenSetting={setOpenSetting}
      />

      <span className="credits">
        <p>tomato model by Aparicio Silva 3D</p>
        <a href="https://sketchfab.com/3d-models/tomato-game-ready-asset-fda1fbe840c344968523a1cbc7395839">(sketchfab link)</a>
      </span>
    </div>
  )
}

export default App