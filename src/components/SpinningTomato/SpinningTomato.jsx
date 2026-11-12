import React, { useState, useEffect} from "react";
import "./SpinningTomato.css"


const SpinningTomato = ({ isPlaying }) => {

    const images = import.meta.glob(
        "/src/assets/spinning_tomato/*.png",
        { eager: true, query: "?url", import: "default" }
    );

    const frames = Object.entries(images)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([, url]) => url);

    const [currentFrame, setCurrentFrame] = useState(0);

    useEffect(() => {
        if (!isPlaying) return;
        
        const id = setInterval(() => {
        setCurrentFrame(frame => (frame + 1) % frames.length);
        }, 115);

        return () => clearInterval(id);
    }, [isPlaying, frames.length]);

  return (
    <div>
        <img src={frames[currentFrame]} alt="" />
    </div>
  )
}

export default SpinningTomato