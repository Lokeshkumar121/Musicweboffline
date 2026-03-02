

function Sidebar({ songs, 
  currentIndex, 
  setCurrentIndex, 
  isOpen, 
  setIsOpen,
  setIsPlaying }) {

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? "show" : ""}`} onClick={() => setIsOpen(false)}></div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        

        {songs.map((song, index) => (
          <div
            key={index}
            className={`song-item ${index === currentIndex ? "active" : ""}`}
            onClick={() => {
              setCurrentIndex(index);
              setIsPlaying(true);
              setIsOpen(false);
            }}
          >
             <img src={song.cover} alt="" />

    <div className="song-info">
      <span className="title">{song.title}</span>
      <span className="artist">{song.artist}</span>
    </div>
     {index === currentIndex && <div className="playing-dot"></div>}
          </div>
        ))}
      </div>
    </>
  );
}

export default Sidebar;