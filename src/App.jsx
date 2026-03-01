import React, { useState } from "react";
import { songs } from "./songs";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import "./index.css";

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="app">
      <Sidebar
        songs={songs}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
      <Player
        songs={songs}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}

export default App;