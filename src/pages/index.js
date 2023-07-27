import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

import song from "../data/index.js";
import styles from "./index.module.css";
import Player from "../components/player/player.js";

export default function Home() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(currentSongIndex + 1);

  useEffect(() => {
    setNextSongIndex(() => {
      if (currentSongIndex + 1 > song.length - 1) {
        return 0;
      } else {
        return currentSongIndex + 1;
      }
    });
  }, [currentSongIndex]);

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <Player
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          nextSongIndex={nextSongIndex}
          song={song}
        />
      </div>
      <div className={styles.playlist}>
        {song.map((item, index) => (
          <div key={index} className={styles.song}>
            <img src={item.image} alt={item.name} className={styles.thumb} />
            <div className={styles.body}>
              <h3 className={styles.title}>{item.name}</h3>
              <p className={styles.author}>{item.singer}</p>
            </div>
            <div className={styles.option}>
              <FontAwesomeIcon icon={faEllipsisH} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
