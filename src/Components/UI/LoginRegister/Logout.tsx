import React from "react";
import styles from "./Logout.module.scss";
import Button from "../Button";

interface LogoutProps {
  logoutHandler: () => void;
  onBlur: () => void;
}

const Logout = ({ logoutHandler, onBlur }: LogoutProps) => {
  const blurHandler = (e: React.FocusEvent<HTMLDivElement, Element>) => {
    console.log(e.currentTarget);

    if (e.currentTarget.contains(e.relatedTarget)) return;
    onBlur();
  };
  return (
    <div className={styles.logoutContainer} onBlur={blurHandler} tabIndex={0}>
      <Button onClick={logoutHandler} />
    </div>
  );
};

export default Logout;
