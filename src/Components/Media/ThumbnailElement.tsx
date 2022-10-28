import React, { useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/reduxHooks";
import ElementContext from "../../store/element-context";
import { toggleBookmark } from "../../store/mediaSlice";
import { IconDeviceTvOld, IconMovie } from "@tabler/icons";
import styles from "./ThumbnailElement.module.scss";
import type { RootState } from "../../store/store";
import { motion } from "framer-motion";
import BookmarkBtn from "../UI/BookmarkBtn";
import PlayBtn from "../UI/PlayBtn";

interface IElement {
  image: string;
  title: string;
  year: number;
  category: string;
  rating: string;
  description?: string;
  isBookmarked: boolean;
  theme?: "Short" | "Long";
}

const Element: React.FC<IElement> = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const elementCtx = useContext(ElementContext);
  const theme = props.theme ? "theme" + props.theme : "themeShort";

  const dispatch = useDispatch();
  const authSel = useAppSelector((state) => state.auth);

  const bookmarkClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(toggleBookmark(props.title));
  };

  const thumbnailClickHanddler = (event: React.MouseEvent<HTMLDivElement>) => {
    elementCtx.setTitleToOpen(props.title);
  };

  const descHoverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (props.theme === "Long") {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  };

  const icon = props.category === "movie" ? <IconMovie /> : <IconDeviceTvOld />;
  return (
    <div
      className={`${styles.element} ${styles[theme]}`}
      onClick={(event) => thumbnailClickHanddler(event)}
    >
      <div className={styles.imgWrapper}>
        <div className={`${styles.hoverLayer}  ${isHovered && styles.show}`}>
          <PlayBtn classNames={styles.playBtnPos} />
        </div>

        <img
          src={props.image}
          alt={`thumbnail of...`}
          className={`${isHovered && styles.imgHoverEffect}`}
        />
        {authSel.isAuthorized && (
          <BookmarkBtn
            isBookmarked={props.isBookmarked}
            bookmarkHandler={bookmarkClickHandler}
            classNames={styles.bookmarkPos}
          />
        )}
      </div>

      <div
        className={styles.description}
        onMouseOver={descHoverHandler}
        onMouseLeave={() => setIsHovered(false)}
      >
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
  );
};

export default Element;
