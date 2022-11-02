import React from "react";
import styles from "./Logout.module.scss";
import Button from "../Button";

interface LogoutProps {
  logoutHandler: any;
  onBlur: () => void;
}

const Logout = ({ logoutHandler, onBlur }: LogoutProps) => {
  const blurHandler = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    onBlur();
  };
  return (
    <div className={styles.logoutContainer} onBlur={blurHandler} tabIndex={0}>
      <Button onClick={logoutHandler}>Logout</Button>
    </div>
  );
};

export default Logout;
