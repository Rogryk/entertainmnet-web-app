import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCircleUser,
  faBookmark,
  faMobileRetro,
} from "@fortawesome/free-solid-svg-icons";
import {
  IconDeviceTvOld,
  IconMovie,
  IconBookmark,
  IconUserCircle,
  IconLayoutGrid,
} from "@tabler/icons";
import "../../index.scss";
import styles from "./SidebarMenuContainer.module.scss";

const SidebarMenuContainer = () => {
  return (
    // <div className="fixed top-10 left-10 rounded-2xl w-20 h-5/6 bg-gray-400 ">
    <div className={styles.sidebarMenuContainer}>
      <button type="submit" className={styles.homeBtn}>
        <FontAwesomeIcon icon={faHouse} size="lg" />
      </button>
      <div className={styles.submenuContainer}>
        <button type="submit">
          <IconLayoutGrid stroke={2} />
        </button>
        <button type="submit">
          <IconDeviceTvOld stroke={2} />
        </button>
        <button type="submit">
          <IconMovie stroke={2} />
        </button>
        <button type="submit">
          <IconBookmark stroke={2} />
        </button>
      </div>
      <button type="submit" className={styles.userBtn}>
        <IconUserCircle stroke={2} />
      </button>
    </div>
  );
};

export default SidebarMenuContainer;
