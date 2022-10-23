import React from "react";
import styles from "./BookmarkBtn.module.scss";
import { IconBookmark } from "@tabler/icons";

interface BookmarkBtnProps {
  isBookmarked: boolean;
  bookmarkHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  classNames?: string;
}

const BookmarkBtn = (props: BookmarkBtnProps) => {
  return (
    <button
      className={`${styles.bookmark} ${props.classNames}`}
      onClick={props.bookmarkHandler}
    >
      <IconBookmark
        stroke={2}
        className={`${styles.bookmarkIcon} ${
          props.isBookmarked && styles.bookmark_green
        }`}
      />
    </button>
  );
};

export default BookmarkBtn;
