import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import {
  IconDeviceTvOld,
  IconMovie,
  IconBookmark,
  IconUserCircle,
} from "@tabler/icons";
import { toggleAuthWindow } from "../../store/authSlice";
import { setCategory } from "../../store/navigationSlice";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import styles from "./SidebarMenuContainer.module.scss";

interface SidebarMenuContainerProps {
  isSidebarMenuHidden: boolean;
  setIsSidebarMenuHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarMenuContainer = (props: SidebarMenuContainerProps) => {
  const dispatch = useAppDispatch();
  const authSel = useAppSelector((state) => state.auth);
  const routerNav = useNavigate();

  const avatarClickHandler = () => {
    !authSel.isAuthWindowOpen && dispatch(toggleAuthWindow());
  };

  const homeClickHandler = () => {
    dispatch(setCategory("home"));
    routerNav("/home");
  };

  return (
    <>
      <div
        className={`${styles.sidebarMenuContainer} ${
          props.isSidebarMenuHidden && styles.hidden
        }`}
      >
        <button
          type="submit"
          className={styles.homeBtn}
          onClick={homeClickHandler}
        >
          <Link to="/home">
            <FontAwesomeIcon icon={faHouse} size="lg" />
          </Link>
        </button>
        <div className={styles.submenuContainer}>
          <button
            type="submit"
            onClick={() => dispatch(setCategory("tvseries"))}
          >
            <Link to="/tvseries">
              <IconDeviceTvOld stroke={2} className={styles.iconColor} />
            </Link>
          </button>
          <button type="submit" onClick={() => dispatch(setCategory("movies"))}>
            <Link to="/movies">
              <IconMovie stroke={2} className={styles.iconColor} />
            </Link>
          </button>

          {authSel.isAuthorized && (
            <button
              type="submit"
              onClick={() => dispatch(setCategory("bookmarks"))}
            >
              <Link to="/bookmarks">
                <IconBookmark stroke={2} className={styles.iconColor} />
              </Link>
            </button>
          )}
        </div>

        <button
          type="submit"
          className={`${styles.userBtn} `}
          onClick={avatarClickHandler}
        >
          <IconUserCircle stroke={2} className={styles.iconColor} />
        </button>
        <button
          type="submit"
          className={`${styles.visibilityBtn} `}
          onClick={() => props.setIsSidebarMenuHidden((prev) => !prev)}
        >
          {`${props.isSidebarMenuHidden ? ">" : "<"}`}
        </button>
      </div>
    </>
  );
};

export default SidebarMenuContainer;
