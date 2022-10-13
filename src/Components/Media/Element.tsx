import React from "react";
import { IconBookmark, IconDeviceTvOld, IconMovie } from "@tabler/icons";
import styles from "./Element.module.scss";

interface IElement {
  image: string;
  description?: string;
  theme?: "short" | "long";
}

const DUMMY_DATA = {
  title: "Beyond Earth",

  year: 2019,
  category: "Movie",
  rating: "PG",
};

const Element: React.FC<IElement> = (props) => {
  const theme = props.theme ? "theme_" + props.theme : "theme_short";
  return (
    <>
      <div className={`${styles.element} ${styles[theme]}`}>
        <img src={props.image} alt={`thumbnail of...`} />
        <button className={styles.bookmark}>
          <IconBookmark stroke={2} className={`${styles.bookmarkIcon} `} />
        </button>
        <div className={styles.description}>
          <ul className={styles.info}>
            <li>{DUMMY_DATA.year}</li>
            <li>
              <span className={styles.info_category}>
                <IconMovie />
                {DUMMY_DATA.category}
              </span>
            </li>
            <li>
              <span>{DUMMY_DATA.rating}</span>
            </li>
          </ul>
          <h3>{DUMMY_DATA.title}</h3>
        </div>
      </div>
    </>
  );
};

export default Element;
