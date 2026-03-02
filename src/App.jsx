import React, { useState } from "react";
import { songs } from "./songs";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import "./index.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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
      />
    </div>
  );
}

export default App;