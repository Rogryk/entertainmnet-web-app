import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import {
  IconDeviceTvOld,
  IconMovie,
  IconBookmark,
  IconUserCircle,
  IconLayoutGrid,
} from "@tabler/icons";
import MenuContext from "../../store/menu-context";
import styles from "./SidebarMenuContainer.module.scss";

interface ISidebarMenuContainer {
  isSidebarMenuHidden: boolean;
  setIsSidebarMenuHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarMenuContainer = (props: ISidebarMenuContainer) => {
  const menuCtx = useContext(MenuContext);

  const hideSidebarHandler = () => {
    props.setIsSidebarMenuHidden((prev) => !prev);
  };

  return (
    <div
      className={`${styles.sidebarMenuContainer} ${
        props.isSidebarMenuHidden ? styles.hidden : ""
      }`}
    >
      <button
        type="submit"
        className={styles.homeBtn}
        onClick={() => menuCtx.setMenuState("home")}
      >
        <FontAwesomeIcon icon={faHouse} size="lg" />
      </button>
      <div className={styles.submenuContainer}>
        <button
          type="submit"
          onClick={() => menuCtx.setMenuState("categories")}
        >
          <IconLayoutGrid stroke={2} className={styles.iconColor} />
        </button>
        <button type="submit" onClick={() => menuCtx.setMenuState("tvseries")}>
          <IconDeviceTvOld stroke={2} className={styles.iconColor} />
        </button>
        <button type="submit" onClick={() => menuCtx.setMenuState("movies")}>
          <IconMovie stroke={2} className={styles.iconColor} />
        </button>

        <button type="submit" onClick={() => menuCtx.setMenuState("bookmarks")}>
          <IconBookmark stroke={2} className={styles.iconColor} />
        </button>
      </div>

      <button
        type="submit"
        className={`${styles.userBtn} `}
        onClick={() => menuCtx.setMenuState("auth-user")}
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
  );
};

export default SidebarMenuContainer;
