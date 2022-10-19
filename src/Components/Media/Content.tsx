import React from "react";
import styles from "./Content.module.scss";
import SubcontentContainer from "./SubcontentContainer";

export interface IMediaContentElement {
  title: string;
  theme: "short" | "long";
  content: any[];
}

interface IContent {
  mediaContent: IMediaContentElement[];
}

const Content: React.FC<IContent> = (props) => {
  return (
    <div className={styles.contentContainer}>
      {props.mediaContent.map((el: IMediaContentElement) => {
        return (
          <SubcontentContainer
            key={el.title}
            theme={el.theme}
            title={el.title}
            content={el.content}
          />
        );
      })}
    </div>
  );
};

export default Content;
