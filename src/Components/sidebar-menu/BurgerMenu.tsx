import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { toggleAuthWindow } from "../../store/authSlice";
import { setCategory } from "../../store/navigationSlice";
import { slide as Menu } from "react-burger-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import {
  IconDeviceTvOld,
  IconMovie,
  IconBookmark,
  IconUserCircle,
} from "@tabler/icons";
import "./BurgerMenuDefault.scss";
import styles from "./SidebarMenuContainer.module.scss";

interface BurgerButtonProps {
  pageWrapId: String;
  outerContainerId: String;
}

const BurgerMenu = (props: BurgerButtonProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const authSel = useAppSelector((state) => state.auth);

  const menuHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    switch (e.currentTarget.innerText.trim()) {
      case "Home":
        dispatch(setCategory("home"));
        break;
      case "Categories":
        dispatch(setCategory("categories"));
        break;
      case "TV Series":
        dispatch(setCategory("tvseries"));
        break;
      case "Movies":
        dispatch(setCategory("movies"));
        break;
      case "Bookmarks":
        dispatch(setCategory("bookmarks"));
        break;
      case "User":
        setTimeout(() => {
          dispatch(toggleAuthWindow());
        }, 100);
        break;
      default:
        dispatch(setCategory("home"));
        break;
    }
    setIsMenuOpen(false);
  };

  return (
    <Menu
      right
      width={"100%"}
      pageWrapId={props.pageWrapId}
      outerContainerId={props.outerContainerId}
      isOpen={isMenuOpen}
      onOpen={() => setIsMenuOpen(true)}
      onClose={() => setIsMenuOpen(false)}
    >
      <button
        className={`${styles.menuItem} ${styles.homeBtn}`}
        onClick={menuHandler}
      >
        <Link to="/home">
          <FontAwesomeIcon icon={faHouse} size="lg" /> Home
        </Link>
      </button>
      <button className={styles.menuItem} onClick={menuHandler}>
        <Link to="/tvseries">
          <IconDeviceTvOld stroke={2} className={styles.iconColor} /> TV Series
        </Link>
      </button>
      <button className={styles.menuItem} onClick={menuHandler}>
        <Link to="/movies">
          <IconMovie stroke={2} className={styles.iconColor} /> Movies
        </Link>
      </button>
      {authSel.isAuthorized && (
        <button className={styles.menuItem} onClick={menuHandler}>
          <Link to="/bookmarks">
            <IconBookmark stroke={2} className={styles.iconColor} /> Bookmarks
          </Link>
        </button>
      )}
      <button
        className={`${styles.menuItem} ${styles.userBtn}`}
        onClick={menuHandler}
      >
        <IconUserCircle stroke={2} className={styles.iconColor} /> User
      </button>
    </Menu>
  );
};

export default BurgerMenu;
