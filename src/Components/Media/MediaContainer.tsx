import React from "react";
import ContentContainer from "./ContentContainer";
import styles from "./MediaContainer.module.scss";
import Searchbar from "./Searchbar";

const MediaContainer = () => {
  return (
    <div className={styles.mediaContainer}>
      <Searchbar />
      <ContentContainer />
    </div>
  );
};

export default MediaContainer;
