import React from "react";

function Sidebar({ songs, currentIndex, setCurrentIndex }) {
  return (
    <div className="sidebar">
      <h2>My Playlist</h2>
      {songs.map((song, index) => (
        <div
          key={index}
          className={`song-item ${index === currentIndex ? "active" : ""}`}
          onClick={() => setCurrentIndex(index)}
        >
          {song.title}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;