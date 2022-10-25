import React from "react";
import styles from "../UI/BookmarkBtn.module.scss";

interface ButtonProps {
  onClick: () => void;
  type?: string;
  childNodes?: any;
  classList?: string;
}

const Button = (props: ButtonProps) => {
  return (
    <button
      className={styles.authContainer}
      type="submit"
      onClick={() => props.onClick()}
      autoFocus={true}
    >
      Logout
    </button>
  );
};

export default Button;
