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
import { useSelector, useDispatch } from "react-redux";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import FIREBASE_CONFIG from "../../utility/FIREBASE_CONFIG";
import AuthContainer from "../UI/LoginRegister/AuthContainer";
import Logout from "../UI/LoginRegister/Logout";

interface ISidebarMenuContainer {
  isSidebarMenuHidden: boolean;
  setIsSidebarMenuHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const firebaseApp = initializeApp(FIREBASE_CONFIG);

const SidebarMenuContainer = (props: ISidebarMenuContainer) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const menuCtx = useContext(MenuContext);
  const dispatch = useDispatch();

  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // https://firebase.google.com/docs/reference/js/firebase.User
    } else {
      console.log("user signed out");
    }
  });

  const hideSidebarHandler = () => {
    props.setIsSidebarMenuHidden((prev) => !prev);
  };

  const avatarClickHandler = () => {
    console.log(auth.currentUser?.email);
    setIsAuthOpen(false);

    setIsAuthOpen((prev) => !prev);
  };

  const loginHandler = async () => {
    setIsAuthOpen(false);
  };
  const registerHandler = async () => {
    setIsAuthOpen(false);
  };
  const onBlurClickHandler = () => {
    setIsAuthOpen(false);
  };

  const logoutHandler = async () => {
    await auth.signOut();
    setIsAuthOpen(false);
    menuCtx.menuState === "bookmarks" && menuCtx.setMenuState("home");
    return;
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
          <button
            type="submit"
            onClick={() => menuCtx.setMenuState("tvseries")}
          >
            <IconDeviceTvOld stroke={2} className={styles.iconColor} />
          </button>
          <button type="submit" onClick={() => menuCtx.setMenuState("movies")}>
            <IconMovie stroke={2} className={styles.iconColor} />
          </button>

          {auth.currentUser?.uid && (
            <button
              type="submit"
              onClick={() => menuCtx.setMenuState("bookmarks")}
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
      {isAuthOpen &&
        (auth.currentUser?.uid ? (
          <Logout logoutHandler={logoutHandler} onBlur={onBlurClickHandler} />
        ) : (
          <AuthContainer
            onLogin={loginHandler}
            onRegister={registerHandler}
            onBlur={onBlurClickHandler}
          />
        ))}
    </>
  );
};

export default SidebarMenuContainer;
