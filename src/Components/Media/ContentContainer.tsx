import React from "react";
import styles from "./ContentContainer.module.scss";
import SubcontentContainer from "./SubcontentContainer";

const ContentContainer = () => {
  return (
    <div className={styles.contentContainer}>
      <SubcontentContainer theme={"long"} title={"Trending"} />
      <SubcontentContainer theme={"short"} title={"Recommended for you"} />
      <SubcontentContainer theme={"short"} title={"Trelele"} />
    </div>
  );
};

export default ContentContainer;
