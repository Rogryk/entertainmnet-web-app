import React from "react";
import Element from "./ThumbnailElement";
import styles from "./SubcontentContainer.module.scss";
import { IMediaBasicInfo } from "./ContentContainer";
import { Route } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";

interface ISubcontentContainer {
  content: IMediaBasicInfo[];
  title: string;
  theme?: "Short" | "Long";
}

const SubcontentContainer: React.FC<ISubcontentContainer> = (props) => {
  const mediaSel = useAppSelector((state) => state.media);
  const theme = props.theme ? "theme" + props.theme : "themeShort";

  const checkBookmarkHandler = (title: string) => {
    if (!mediaSel.userData) {
      return false;
    }
    if (title in mediaSel.userData.bookmarks) {
      return true;
    } else {
      return false;
    }
  };

  return (
    // <Route path={`/${props.title.replace(/\s/g, "")}`}>
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
                // isBookmarked={el.isBookmarked}
                isBookmarked={checkBookmarkHandler(el.title)}
                theme={props.theme}
                image={process.env.PUBLIC_URL + el.smallThumbnail}
              />
            );
          })}
      </div>
    </div>
    // </Route>
  );
};

export default SubcontentContainer;
