import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import {
  IconDeviceTvOld,
  IconMovie,
  IconBookmark,
  IconUserCircle,
  IconLayoutGrid,
} from "@tabler/icons";
import styles from "./SidebarMenuContainer.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { toggleAuthWindow } from "../../store/authSlice";
import { setCategory } from "../../store/navigationSlice";
import type { RootState } from "../../store/store";

interface ISidebarMenuContainer {
  isSidebarMenuHidden: boolean;
  setIsSidebarMenuHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarMenuContainer = (props: ISidebarMenuContainer) => {
  const dispatch = useAppDispatch();
  const authSel = useAppSelector((state) => state.auth);

  const hideSidebarHandler = () => {
    props.setIsSidebarMenuHidden((prev) => !prev);
  };

  const avatarClickHandler = () => {
    !authSel.isAuthWindowOpen && dispatch(toggleAuthWindow());
  };

  return (
    <>
      <div
        className={`${styles.sidebarMenuContainer} ${
          props.isSidebarMenuHidden ? styles.hidden : ""
        }`}
      >
        <button
          type="submit"
          className={styles.homeBtn}
          onClick={() => dispatch(setCategory("home"))}
        >
          <FontAwesomeIcon icon={faHouse} size="lg" />
        </button>
        <div className={styles.submenuContainer}>
          <button
            type="submit"
            onClick={() => dispatch(setCategory("categories"))}
          >
            <IconLayoutGrid stroke={2} className={styles.iconColor} />
          </button>
          <button
            type="submit"
            onClick={() => dispatch(setCategory("tvseries"))}
          >
            <IconDeviceTvOld stroke={2} className={styles.iconColor} />
          </button>
          <button type="submit" onClick={() => dispatch(setCategory("movies"))}>
            <IconMovie stroke={2} className={styles.iconColor} />
          </button>

          {authSel.isAuthorized && (
            <button
              type="submit"
              onClick={() => dispatch(setCategory("bookmarks"))}
            >
              <IconBookmark stroke={2} className={styles.iconColor} />
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
          onClick={() => hideSidebarHandler()}
        >
          {`${props.isSidebarMenuHidden ? ">" : "<"}`}
        </button>
      </div>
    </>
  );
};

export default SidebarMenuContainer;
