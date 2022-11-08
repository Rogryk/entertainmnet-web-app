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
import styles from "./BurgerMenu.module.scss";

interface BurgerButtonProps {
  pageWrapId: String;
  outerContainerId: String;
}

const BurgerMenu = (props: BurgerButtonProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const authSel = useAppSelector((state) => state.auth);
  const iconSize = "2.4rem";

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
        className={`${styles.effects} ${styles.homeButton} `}
        onClick={menuHandler}
      >
        <Link to="/home">
          <FontAwesomeIcon icon={faHouse} fontSize={iconSize} />
          Home
        </Link>
      </button>
      <button className={styles.effects} onClick={menuHandler}>
        <Link to="/tvseries">
          <IconDeviceTvOld
            stroke={2}
            className={styles.iconColor}
            size={iconSize}
          />{" "}
          TV Series
        </Link>
      </button>
      <button className={styles.effects} onClick={menuHandler}>
        <Link to="/movies">
          <IconMovie stroke={2} className={styles.iconColor} size={iconSize} />{" "}
          Movies
        </Link>
      </button>
      {authSel.isAuthorized && (
        <button className={styles.effects} onClick={menuHandler}>
          <Link to="/bookmarks">
            <IconBookmark
              stroke={2}
              className={styles.iconColor}
              size={iconSize}
            />{" "}
            Bookmarks
          </Link>
        </button>
      )}
      <button className={`user-button ${styles.effects}`} onClick={menuHandler}>
        <Link to="/auth">
          <IconUserCircle stroke={2} size={iconSize} /> User
        </Link>
      </button>
    </Menu>
  );
};

export default BurgerMenu;
