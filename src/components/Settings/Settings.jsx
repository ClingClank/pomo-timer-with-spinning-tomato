import React from "react";
import "./Settings.css";

const Settings = ({
    pomodoro,
    setPomodoro,
    shortBreak,
    setShortBreak,
    longBreak,
    setLongBreak,
    setOpenSetting
}) => {
    const settings = [
        {
            id: "pomodoro",
            label: "Pomodoro",
            value: pomodoro,
            onChange: setPomodoro
        },
        {
            id: "short-break",
            label: "Short break",
            value: shortBreak,
            onChange: setShortBreak
        },
        {
            id: "long-break",
            label: "Long break",
            value: longBreak,
            onChange: setLongBreak
        }
    ];

    return (
        <div
            className="settings-backdrop"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    setOpenSetting(false);
                }
            }}
        >
            <section
                className="settings"
                role="dialog"
                aria-modal="true"
                aria-labelledby="settings-title"
            >
                <div className="settings-header">
                    <h2 id="settings-title">Timer settings (minutes)</h2>
                </div>

                <div className="three-timers">
                    {settings.map(({ id, label, value, onChange }) => (
                        <div className="timer-setting" key={id}>
                            <label htmlFor={id}>{label}</label>
                            <input
                                id={id}
                                type="number"
                                min="1"
                                step="1"
                                value={value / 60000}
                                onChange={(event) => {
                                    const minutes = Number(event.target.value);
                                    onChange(minutes * 60000);
                                }}
                            />
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    className="settings-done"
                    onClick={() => setOpenSetting(false)}
                >
                    Done
                </button>
            </section>
        </div>
    );
};

export default Settings;
