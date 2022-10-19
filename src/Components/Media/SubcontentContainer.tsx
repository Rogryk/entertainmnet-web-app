import React from "react";
import Element from "./Element";
import styles from "./SubcontentContainer.module.scss";
import { IMediaBasicInfo } from "./ContentContainer";

interface ISubcontentContainer {
  content: IMediaBasicInfo[];
  title: string;
  theme?: "short" | "long";
}

const SubcontentContainer: React.FC<ISubcontentContainer> = (props) => {
  const theme = props.theme ? "theme_" + props.theme : "theme_short";

  return (
    <div className={styles.wrapper}>
      <h2>{props.title}</h2>
      <div className={`${styles.subcontentContainer} ${styles[theme]}`}>
        {props.content &&
          props.content.map((el) => {
            return (
              <Element
                key={el.title}
                title={el.title}
                year={el.year}
                rating={el.rating}
                category={el.category}
                isBookmarked={el.isBookmarked}
                theme={props.theme}
                image={process.env.PUBLIC_URL + el.smallThumbnail}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SubcontentContainer;
