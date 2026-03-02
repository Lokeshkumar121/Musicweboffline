import React, { useState, useEffect } from "react";
import { songs } from "./songs";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import "./index.css";

function App() {
  const [isOnline, setIsOnline] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);


  useEffect(() => {
  const updateStatus = () => {
    setIsOnline(navigator.onLine);
  };

  updateStatus(); // 👈 important initial sync

  window.addEventListener("online", updateStatus);
  window.addEventListener("offline", updateStatus);

  return () => {
    window.removeEventListener("online", updateStatus);
    window.removeEventListener("offline", updateStatus);
  };
}, []);

  return (
    <div className="app">
      <Sidebar
        songs={songs}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        setIsPlaying={setIsPlaying}
      />

      <Player
        songs={songs}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        setIsSidebarOpen={setIsSidebarOpen}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        isOnline={isOnline}
      />
    </div>
  );
}

export default App;