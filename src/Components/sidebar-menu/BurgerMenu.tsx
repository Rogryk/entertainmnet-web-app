import React, { useContext, useState } from "react";
import MenuContext from "../../store/menu-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
  IconLayoutGrid,
} from "@tabler/icons";
import "./BurgerMenuDefault.scss";

import styles from "./SidebarMenuContainer.module.scss";

interface BurgerButtonProps {
  pageWrapId: String;
  outerContainerId: String;
}

const BurgerButton = (props: BurgerButtonProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const authSel = useAppSelector((state) => state.auth);

  const menuHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
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
  const onOpenHandler = () => {
    setIsMenuOpen(true);
  };

  return (
    <Menu
      right
      width={"100%"}
      pageWrapId={props.pageWrapId}
      outerContainerId={props.outerContainerId}
      isOpen={isMenuOpen}
      onOpen={onOpenHandler}
      onClose={() => setIsMenuOpen(false)}
    >
      <a
        className={`${styles.menuItem} ${styles.homeBtn}`}
        href="/"
        onClick={menuHandler}
      >
        <FontAwesomeIcon icon={faHouse} size="lg" /> Home
      </a>
      <a className={styles.menuItem} href="/categories" onClick={menuHandler}>
        <IconLayoutGrid stroke={2} className={styles.iconColor} /> Categories
      </a>
      <a className={styles.menuItem} href="/tvseries" onClick={menuHandler}>
        <IconDeviceTvOld stroke={2} className={styles.iconColor} /> TV Series
      </a>
      <a className={styles.menuItem} href="/movies" onClick={menuHandler}>
        <IconMovie stroke={2} className={styles.iconColor} /> Movies
      </a>
      {auth.currentUser?.uid && (
        <a className={styles.menuItem} href="/bookmarks" onClick={menuHandler}>
          <IconBookmark stroke={2} className={styles.iconColor} /> Bookmarks
        </a>
      )}
      <a
        className={`${styles.menuItem} ${styles.userBtn}`}
        href="/user"
        onClick={menuHandler}
      >
        <IconUserCircle stroke={2} className={styles.iconColor} /> User
      </a>
    </Menu>
  );
};

export default BurgerButton;
