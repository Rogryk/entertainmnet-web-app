import React from "react";
import styles from "./ContentContainer.module.scss";
import SubcontentContainer from "./SubcontentContainer";

const ContentContainer = () => {
  return (
    <div className={styles.contentContainer}>
      <SubcontentContainer style={"long"} title={"Trending"} />
    </div>
  );
};

export default ContentContainer;
