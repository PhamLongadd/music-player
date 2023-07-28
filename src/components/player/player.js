import React, { useState, useRef, useEffect } from "react";

import PlayerDetails from "../playerDetails/playerDetails.js";
import PlayerControls from "../playerControls/playerControls.js";
import styles from "./player.module.css";

function Player(props) {
  const audioEl = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
    } else {
      audioEl.current.pause();
    }
  });

  useEffect(() => {
    const handleTimeUpdate = () => {
      setCurrentTime(audioEl.current.currentTime);
    };

    audioEl.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioEl.current.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

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

  const replaySong = () => {
    audioEl.current.currentTime = 0;
    setIsPlaying(true);
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * props.song.length);
    props.setCurrentSongIndex(randomIndex);
  };

  const handleInput = (e) => {
    const currentTime = e.target.value;
    setCurrentTime(currentTime);
    audioEl.current.currentTime = currentTime;
  };

  return (
    <div className={styles.wrapper}>
      <PlayerDetails song={props.song[props.currentSongIndex]} />
      <PlayerControls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        skipSong={skipSong}
        replaySong={replaySong}
        handleRandom={handleRandom}
      />
      <input
        id="progress"
        className={styles.progress}
        type="range"
        value={currentTime}
        step="1"
        min="0"
        max={
          audioEl.current && audioEl.current.duration
            ? audioEl.current.duration
            : "100"
        }
        onChange={handleInput}
      ></input>
      <audio
        src={props.song[props.currentSongIndex].path}
        ref={audioEl}
      ></audio>
      <div className={styles.nextUp}>
        <h4>Next Up:</h4>
        <h2>{props.song[props.nextSongIndex].name}</h2>
        <p>{props.song[props.nextSongIndex].singer}</p>
      </div>
    </div>
  );
}

export default Player;
