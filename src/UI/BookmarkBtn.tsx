import React from "react";
import { IconBookmark } from "@tabler/icons";

interface BookmarkBtnProps {
  isBookmarked: boolean;
  bookmarkHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  classNames?: string;
}

const BookmarkBtn = (props: BookmarkBtnProps) => {
  return (
    <button
      className={`bookmark position dimensions effects styles ${props.classNames}`}
      onClick={props.bookmarkHandler}
    >
      <IconBookmark
        stroke={1}
        className={`bookmarkIcon  ${props.isBookmarked && "bookmarkChecked"}`}
        fill={props.isBookmarked ? "white" : "rgba(0, 0, 0, 0.2)"}
      />
    </button>
  );
};

export default BookmarkBtn;
