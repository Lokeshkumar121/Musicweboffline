import React, { useState, useRef, useEffect } from "react";

function Player({ songs, currentIndex, setCurrentIndex }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);
    const [isLoop, setIsLoop] = useState(false);

    const toggleLoop = () => {
        const newLoopState = !isLoop;
        setIsLoop(newLoopState);
        audioRef.current.loop = newLoopState;
    };

    const playPause = () => {
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();
        setIsPlaying(!isPlaying);
    };

    const nextSong = () => {
        setCurrentIndex((prev) => (prev + 1) % songs.length);
    };

    const prevSong = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? songs.length - 1 : prev - 1
        );
    };

    const updateProgress = () => {
        const currentTime = audioRef.current.currentTime;
        setProgress(currentTime);
    };

    const setAudioData = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value;
        setProgress(e.target.value);
    };

    // 🔹 Time Format Function (MM:SS)
    const formatTime = (time) => {
        if (!time) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return (
            minutes.toString().padStart(2, "0") +
            ":" +
            seconds.toString().padStart(2, "0")
        );
    };

    useEffect(() => {
        if (isPlaying) audioRef.current.play();
    }, [currentIndex]);

    return (
        <div className="player">
            <img src={songs[currentIndex].cover} alt="cover" />
            <h2>{songs[currentIndex].title}</h2>
            <p>{songs[currentIndex].artist}</p>

            <audio
                ref={audioRef}
                src={songs[currentIndex].src}
                onTimeUpdate={updateProgress}
                onLoadedMetadata={setAudioData}
                onEnded={nextSong}
            />

            {/* 🔹 Progress Bar */}
            <input
                type="range"
                min="0"
                max={duration}
                value={progress}
                onChange={handleSeek}
                style={{
                    "--progress": duration ? (progress / duration) * 100 : 0
                }}
            />

            {/* 🔹 Time Display */}
            <div className="time-display">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
            </div>

            <div className="controls">
                <button onClick={prevSong}>⏮</button>
                <button onClick={playPause}>
                    {isPlaying ? "⏸" : "▶"}
                </button>
                <button onClick={nextSong}>⏭</button>
                <button
                    onClick={toggleLoop}
                    style={{ background: isLoop ? "#1db954" : "#555" }}
                >
                    🔁
                </button>
            </div>
        </div>
    );
}

export default Player;