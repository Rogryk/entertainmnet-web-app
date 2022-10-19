import React, { useContext } from "react";
import { IconBookmark, IconDeviceTvOld, IconMovie } from "@tabler/icons";
import styles from "./Element.module.scss";
import ElementContext from "../../store/element-context";

interface IElement {
  image: string;
  title: string;
  year: number;
  category: string;
  rating: string;
  description?: string;
  isBookmarked: boolean;
  theme?: "short" | "long";
}

const Element: React.FC<IElement> = (props) => {
  const elementCtx = useContext(ElementContext);
  const theme = props.theme ? "theme_" + props.theme : "theme_short";

  const bookmarkClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    elementCtx.setTitleToBookmark(props.title);
  };

  const thumbnailClickHanddler = (event: React.MouseEvent<HTMLDivElement>) => {
    elementCtx.setTitleToOpen(props.title);
  };

  const icon = props.category === "movie" ? <IconMovie /> : <IconDeviceTvOld />;
  return (
    <>
      <div
        className={`${styles.element} ${styles[theme]}`}
        onClick={(event) => thumbnailClickHanddler(event)}
      >
        <img src={props.image} alt={`thumbnail of...`} />
        <button
          className={`${styles.bookmark} `}
          onClick={(event) => bookmarkClickHandler(event)}
        >
          <IconBookmark
            stroke={2}
            className={`${styles.bookmarkIcon} ${
              props.isBookmarked && styles.bookmark_green
            }`}
          />
        </button>
        <div className={styles.description}>
          <ul className={styles.info}>
            <li>{props.year}</li>
            <li>
              <span className={styles.info_category}>
                {icon}
                {props.category}
              </span>
            </li>
            <li>
              <span>{props.rating}</span>
            </li>
          </ul>
          <h3>{props.title}</h3>
        </div>
      </div>
    </>
  );
};

export default Element;
