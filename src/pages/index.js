import {
  faEllipsisH,
  faPlay,
  faRandom,
  faRedo,
  faStepBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import song from "../data/index.js";
import styles from "./index.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <h4>Now playing:</h4>
        <h2>String 57th & 9th</h2>
        <div className={styles.cd}>
          <img
            src="https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
            alt="ss"
            className={styles.cdThumb}
          />
        </div>
        <div className={styles.control}>
          <div className={styles.btnRepeat}>
            <FontAwesomeIcon icon={faRedo} />
          </div>
          <div className={styles.btnPrev}>
            <FontAwesomeIcon icon={faStepBackward} />
          </div>
          <div className={styles.btnTogglePlay}>
            <FontAwesomeIcon icon={faPlay} />
          </div>
          <div className={styles.btnNext}>
            <FontAwesomeIcon icon={faStepForward} />
          </div>
          <div className={styles.btnRandom}>
            <FontAwesomeIcon icon={faRandom} />
          </div>
        </div>
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
