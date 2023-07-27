import React, { useState, useRef, useEffect } from "react";
import PlayerDetails from "../playerDetails/playerDetails.js";
import PlayerControls from "../playerControls/playerControls.js";

function Player(props) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  });

  const skipSong = (forwards = true) => {
    if (forwards) {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp++;

        if (temp > props.song.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      props.setCurrentSongIndex(() => {
        let temp = props.currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = props.song.length - 1;
        }

        return temp;
      });
    }
  };

  return (
    <div>
      <PlayerDetails song={props.song[props.currentSongIndex]} />
      <PlayerControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        skipSong={skipSong}
      />
      <audio
        src={props.song[props.currentSongIndex].path}
        ref={audioEl}
      ></audio>
    </div>
  );
}

export default Player;
