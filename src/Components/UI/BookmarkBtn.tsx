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
        stroke={2}
        className={`bookmarkIcon  ${props.isBookmarked && "bookmarkChecked"}`}
      />
    </button>
  );
};

export default BookmarkBtn;
