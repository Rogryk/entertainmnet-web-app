import React, { useState, memo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toggleBookmark } from "../../store/mediaSlice";
import { IconDeviceTvOld, IconMovie } from "@tabler/icons";
import styles from "./ThumbnailElement.module.scss";
import BookmarkBtn from "../UI/BookmarkBtn";
import PlayBtn from "../UI/PlayBtn";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";

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
  const theme = props.theme ? "theme" + props.theme : "themeShort";

  const dispatch = useAppDispatch();
  const authSel = useAppSelector((state) => state.auth);

  const bookmarkClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(toggleBookmark(props.title));
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
    <div className={`${styles.element} ${styles[theme]}`}>
      <div className={styles.imgWrapper}>
        <div className={`${styles.hoverLayer}  ${isHovered && styles.show}`}>
          <PlayBtn classNames={styles.playBtnPos} />
        </div>

        <LazyLoadImage
          src={props.image}
          alt={`thumbnail of...`}
          className={`${isHovered && styles.imgHoverEffect}`}
          effect="opacity"
        ></LazyLoadImage>

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

export default memo(Element);
