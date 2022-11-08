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
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import styles from "./SidebarMenuContainer.module.scss";

interface SidebarMenuContainerProps {
  isSidebarMenuHidden: boolean;
  setIsSidebarMenuHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarMenuContainer = (props: SidebarMenuContainerProps) => {
  const dispatch = useAppDispatch();
  const authSel = useAppSelector((state) => state.auth);

  const avatarClickHandler = () => {
    !authSel.isAuthWindowOpen && dispatch(toggleAuthWindow());
  };

  return (
    <>
      <nav
        className={`sidebar position dimensions ${styles.effects} ${
          styles.sidebarStyles
        } ${props.isSidebarMenuHidden && "hidden"}`}
      >
        <button
          type="submit"
          className={styles.homeButton}
          onClick={() => dispatch(setCategory("home"))}
        >
          <Link to="/home">
            <FontAwesomeIcon icon={faHouse} size="lg" />
          </Link>
        </button>
        <div className={`buttonsContainer`}>
          <button
            type="submit"
            onClick={() => dispatch(setCategory("tvseries"))}
          >
            <Link to="/tvseries">
              <IconDeviceTvOld stroke={2} />
            </Link>
          </button>
          <button type="submit" onClick={() => dispatch(setCategory("movies"))}>
            <Link to="/movies">
              <IconMovie stroke={2} />
            </Link>
          </button>

          {authSel.isAuthorized && (
            <button
              type="submit"
              onClick={() => dispatch(setCategory("bookmarks"))}
            >
              <Link to="/bookmarks">
                <IconBookmark stroke={2} />
              </Link>
            </button>
          )}
        </div>

        <button type="submit" onClick={avatarClickHandler}>
          <IconUserCircle stroke={2} />
        </button>
        <button
          type="submit"
          className={`toggleVisibilityButton ${styles.toggleVisibilityButtonStyles} `}
          onClick={() => props.setIsSidebarMenuHidden((prev) => !prev)}
        >
          {`${props.isSidebarMenuHidden ? ">" : "<"}`}
        </button>
      </nav>
    </>
  );
};

export default SidebarMenuContainer;
