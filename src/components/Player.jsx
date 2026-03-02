import React, { useState, useRef, useEffect } from "react";

function Player({ songs,
    currentIndex,
    setCurrentIndex,
    setIsSidebarOpen,
    isPlaying,
    setIsPlaying,
    isOnline }) {

    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoop, setIsLoop] = useState(false);
    const audioRef = useRef(null);
    useEffect(() => {
        setProgress(0);
    }, [currentIndex]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [currentIndex, isPlaying]);

    const toggleLoop = () => {
        const newLoopState = !isLoop;
        setIsLoop(newLoopState);
        audioRef.current.loop = newLoopState;
    };

    const playPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
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
        setProgress(audioRef.current.currentTime);
    };

    const setAudioData = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e) => {
        audioRef.current.currentTime = e.target.value;
        setProgress(e.target.value);
    };

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



    return (
        <div className="player-container">
            <div className="mode-indicator">
                {isOnline ? "🟢 Online Mode" : "🔴 Offline Mode"}
            </div>

            {/* ✅ TOP BAR (NOW CORRECT POSITION) */}
            <div className="top-bar">
                <button
                    className="menu-btn"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    ☰
                </button>
            </div>


            <div className={`image-wrapper ${isPlaying ? "playing" : ""} ${
    !isOnline ? "offline-style" : ""
  }`}
                style={{
                    backgroundImage: `url(${songs[currentIndex].cover})`
                }}>
                <img src={songs[currentIndex].cover} alt="cover" className={isPlaying ? "playing" : ""} />
            </div>



            {!isOnline && (
                <div className="offline-mode">
                    🔴 You are Offline
                </div>
            )}


            <div className="content">
                <h2>{songs[currentIndex].title}</h2>
                <p>{songs[currentIndex].artist}</p>

                <input
                    type="range"
                    min="0"
                    max={duration}
                    value={progress}
                    onChange={handleSeek}
                />

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

            <audio
                ref={audioRef}
                src={songs[currentIndex].src}
                onTimeUpdate={updateProgress}
                onLoadedMetadata={setAudioData}
                onEnded={nextSong}
            />

        </div>
    );
}

export default Player;