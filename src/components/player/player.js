import React, { useState, useRef, useEffect } from "react";

import PlayerDetails from "../playerDetails/playerDetails.js";
import PlayerControls from "../playerControls/playerControls.js";
import styles from "./player.module.css";

function Player(props) {
  const audioEl = useRef(null);
  const progressBar = useRef();
  const animationRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      audioEl.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioEl.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  });

  useEffect(() => {
    const seconds = Math.floor(audioEl.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioEl?.current?.loadedmetadata, audioEl?.current?.readyState]);

  const whilePlaying = () => {
    progressBar.current.value = audioEl.current.currentTime;
    setCurrentTime(progressBar.current.value);
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

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

  const handleInput = () => {
    audioEl.current.currentTime = progressBar.current.value;
    setCurrentTime(progressBar.current.value);
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
        defaultValue="0"
        ref={progressBar}
        onChange={handleInput}
      ></input>
      <div className={styles.time}>
        <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
        <div className={styles.duration}>
          {duration && !isNaN(duration) && calculateTime(duration)}
        </div>
      </div>
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
