import React from "react";

import styles from "./playerDtails.module.css";

function PlayerDetails(props) {
  return (
    <div>
      <h4>Now playing:</h4>
      <h2>{props.song.name}</h2>
      <div className={styles.cd}>
        <img src={props.song.image} alt="ss" className={styles.cdThumb} />
      </div>
    </div>
  );
}

export default PlayerDetails;
