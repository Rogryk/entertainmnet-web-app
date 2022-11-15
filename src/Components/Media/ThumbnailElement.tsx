import React, { useState, memo } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toggleBookmark } from "../../store/mediaSlice";
import { IconDeviceTvOld, IconMovie } from "@tabler/icons";
import BookmarkBtn from "../../UI/BookmarkBtn";
import PlayBtn from "../../UI/PlayBtn";
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

  const descHoverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    props.theme === "Long" ? setIsHovered(true) : setIsHovered(false);
  };

  const icon = props.category === "Movie" ? <IconMovie /> : <IconDeviceTvOld />;
  return (
    <div className={`element position ${theme}`}>
      <div
        className={`imageWrapper ${theme}`}
        onMouseOver={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`hoverLayer position dimensions effects styles  ${
            isHovered && "show"
          }`}
        >
          <PlayBtn classNames={`playBtn`} />
        </div>

        <LazyLoadImage
          src={props.image}
          alt={`thumbnail of...`}
          className={`thumbnailImage ${isHovered && "imageHoverEffect"}`}
          effect="opacity"
        ></LazyLoadImage>

        {authSel.isAuthorized && (
          <BookmarkBtn
            isBookmarked={props.isBookmarked}
            bookmarkHandler={() => dispatch(toggleBookmark(props.title))}
            classNames={"bookmarkPos"}
          />
        )}
      </div>

      <div
        className={`description position dimensions ${theme}`}
        onMouseOver={descHoverHandler}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ul className={"info  styles"}>
          <li className={`info__element`}>{props.year}</li>
          <li className={`info__element`}>
            <span className={"element_category"}>
              {icon}
              {props.category}
            </span>
          </li>
          <li className={`info__element`}>
            <span>{props.rating}</span>
          </li>
        </ul>
        <h3 className={`mediaTitle`}>{props.title}</h3>
      </div>
    </div>
  );
};

export default memo(Element);
