import React from "react";
import {
  faPause,
  faPlay,
  faRandom,
  faRedo,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./playerControls.module.css";

function PlayerControls(props) {
  return (
    <div className={styles.control}>
      <div className={styles.btnRepeat}>
        <FontAwesomeIcon icon={faRedo} />
      </div>
      <div className={styles.btnPrev} onClick={() => props.skipSong(false)}>
        <FontAwesomeIcon icon={faStepBackward} />
      </div>
      <div
        className={styles.btnTogglePlay}
        onClick={() => props.setIsPlaying(!props.isPlaying)}
      >
        <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
      </div>
      <div className={styles.btnNext} onClick={() => props.skipSong()}>
        <FontAwesomeIcon icon={faStepForward} />
      </div>
      <div className={styles.btnRandom}>
        <FontAwesomeIcon icon={faRandom} />
      </div>
    </div>
  );
}

export default PlayerControls;
