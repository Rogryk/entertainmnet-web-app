import React, { memo } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import Element from "./ThumbnailElement";
import type { IMediaBasicInfo } from "./ContentContainer";

interface ISubcontentContainer {
  content: IMediaBasicInfo[];
  title: string;
  theme?: "Short" | "Long";
}

const SubcontentContainer: React.FC<ISubcontentContainer> = (props) => {
  const mediaSel = useAppSelector((state) => state.media);

  const checkBookmarkHandler = (title: string) => {
    return mediaSel.userData && title in mediaSel.userData.bookmarks
      ? true
      : false;
  };

  return (
    <div className={"subcontentContainer dimensions styles"}>
      <h2>{props.title}</h2>
      <div className={`subcontent styles theme${props.theme}`}>
        {props.content &&
          props.content.map((el) => {
            return (
              <Element
                key={el.title}
                title={el.title}
                year={el.year}
                rating={el.rating}
                category={el.category}
                isBookmarked={checkBookmarkHandler(el.title)}
                theme={props.theme}
                image={process.env.PUBLIC_URL + el.smallThumbnail}
              />
            );
          })}
      </div>
    </div>
  );
};

export default memo(SubcontentContainer);
