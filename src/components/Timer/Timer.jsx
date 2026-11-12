import React, { useState, useRef, useEffect } from "react";
import "./Timer.css";
import SpinningTomato from "../SpinningTomato/SpinningTomato";

const Timer = ({
    pomodoro,
    shortBreak,
    longBreak,
    openSetting,
    setOpenSetting
}) => {
    const intervalRef = useRef(null);
    const startTimeRef = useRef(pomodoro);
    const remainingTimeRef = useRef(pomodoro);
    const completedPomos = useRef(0);

    const [isRunning, setIsRunning] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [selectedType, setSelectedType] = useState("pomodoro");
    const [timer, setTimer] = useState(formatTime());
    const [playAnimation, setPlayAnimation] = useState(false);

    function formatTime() {
        const minutes = Math.floor(remainingTimeRef.current / 1000 / 60);
        const seconds = Math.floor((remainingTimeRef.current / 1000) % 60);

        return (
            (minutes > 9 ? minutes : `0${minutes}`) +
            ":" +
            (seconds > 9 ? seconds : `0${seconds}`)
        );
    }

    const updateTimer = () => {
        if (remainingTimeRef.current < 0) return;
        setTimer(formatTime());
    };

    const startTimer = () => {
        if (intervalRef.current) return;

        setIsRunning(true);
        setPlayAnimation(true);

        const id = setInterval(() => {
            if (remainingTimeRef.current > 0) {
                remainingTimeRef.current -= 1000;
            } else {
                nextTimer();
            }

            updateTimer();
        }, 1000);

        intervalRef.current = id;
    };

    const stopTimer = () => {
        setIsRunning(false);
        setPlayAnimation(false);

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const pickTimer = (type) => {
        stopTimer();
        setSelectedType(type);

        if (type === "pomodoro") {
            startTimeRef.current = pomodoro;
            setIsBreak(false);
        } else if (type === "short break") {
            startTimeRef.current = shortBreak;
            setIsBreak(true);
        } else if (type === "long break") {
            startTimeRef.current = longBreak;
            setIsBreak(true);
        }

        remainingTimeRef.current = startTimeRef.current;
        updateTimer();
    };

    useEffect(() => {
        const timePassed = startTimeRef.current - remainingTimeRef.current;

        if (isBreak) {
            startTimeRef.current =
                completedPomos.current % 4 === 0 ? longBreak : shortBreak;
        } else {
            startTimeRef.current = pomodoro;
        }

        remainingTimeRef.current = startTimeRef.current - timePassed;
        updateTimer();
    }, [pomodoro, shortBreak, longBreak]);

    return (
        <div className="timer">
            <div className="time-type" role="group" aria-label="Timer mode">
                {["pomodoro", "short break", "long break"].map((type) => (
                    <button
                        key={type}
                        type="button"
                        className={`mode-button ${
                            selectedType === type ? "is-selected" : ""
                        }`}
                        aria-pressed={selectedType === type}
                        onClick={() => pickTimer(type)}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="tomato-and-timer">
                <div className="timer-container">
                    <h1>{timer}</h1>
                </div>
                <SpinningTomato isPlaying={playAnimation} />
            </div>

            <div className="setting-start">
                <button
                    type="button"
                    className="utility-button settings-button"
                    aria-label="Open settings"
                    onClick={() => setOpenSetting(!openSetting)}
                >
                    <img src="src/assets/setting.png" alt="" />
                </button>

                <button
                    type="button"
                    className={`start-pause-button ${
                        isRunning ? "is-running" : ""
                    }`}
                    onClick={isRunning ? stopTimer : startTimer}
                >
                    {isRunning ? "Pause" : "Start"}
                </button>
            </div>
        </div>
    );
};

export default Timer;
