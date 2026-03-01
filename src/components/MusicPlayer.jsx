import React, { useState, useRef, useEffect } from "react";
import { songs } from "../songs";

function MusicPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

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

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex]);

  return (
    <div className="player">
      <h2>{songs[currentIndex].title}</h2>
      <p>{songs[currentIndex].artist}</p>

      <img src={songs[currentIndex].cover} alt="cover" />

      <audio
        ref={audioRef}
        src={songs[currentIndex].src}
        onEnded={nextSong}
      />

      <div className="controls">
        <button onClick={prevSong}>⏮</button>
        <button onClick={playPause}>
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
        <button onClick={nextSong}>⏭</button>
      </div>
    </div>
  );
}

export default MusicPlayer;