import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "./App.module.scss";
import SidebarMenuContainer from "./Components/sidebar-menu/SidebarMenuContainer";
import MediaContainer from "./Components/Media/MediaContainer";
import MenuContext from "./store/menu-context";
import BurgerMenu from "./Components/sidebar-menu/BurgerMenu";
import {
  toggleAuthWindow,
  registerHandler,
  logoutHandler,
  loginHandler,
  login,
} from "./store/authSlice";
import { setCategory } from "./store/navigationSlice";
import type { UserCredentialsProps } from "./store/authSlice";
import type { IuserData } from "./store/mediaSlice";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { auth } from "./utility/initFirebase";
import { onAuthStateChanged } from "firebase/auth";
import AuthModal from "./Components/UI/LoginRegister/AuthModal";
import useHttp from "./hooks/useHttp";
import { loadUserData } from "./store/mediaSlice";

const SUBPAGES_LIST = ["home", "categories", "movies", "tvseries", "bookmarks"];
const FIREBASE_USERS_URL =
  "https://web-entertainment-app-default-rtdb.firebaseio.com/users";

function App() {
  const [menuState, setMenuState] = useState("home");
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [isPhoneWidth, setIsPhoneWidth] = useState(false);
  const appDispatch = useAppDispatch();
  const authSelector = useAppSelector((state) => state.auth);
  const { isLoading, error, sendRequest } = useHttp();
  let location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 490 ? setIsPhoneWidth(true) : setIsPhoneWidth(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    auth.currentUser && loadUserDataHandler(auth.currentUser.uid);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        appDispatch(login(user.email));
        console.log("auth state changed: logged in");
        loadUserDataHandler(user.uid);
      } else {
        appDispatch(logoutHandler());
        loadUserData(null);

        console.log("user signed out");
      }
    });
  }, []);

  // React Router listener
  useEffect(() => {
    if (!authSelector.isAuthorizing) {
      const urlPath = location.pathname.slice(1);
      if (SUBPAGES_LIST.includes(urlPath)) {
        console.log(urlPath);
        if (urlPath === "bookmarks") {
          authSelector.isAuthorized
            ? appDispatch(setCategory(urlPath))
            : appDispatch(setCategory("home"));
        } else {
          appDispatch(setCategory(urlPath));
        }
      }
    }
  }, [location, authSelector.isAuthorizing, authSelector.isAuthorized]);

  const loadUserDataHandler = (uid: string) => {
    console.log("loading user data HAAANDLER");
    sendRequest(
      {
        url: `${FIREBASE_USERS_URL}/${uid}.json`,
      },
      dispatchUserDataHandler
    );
  };

  const dispatchUserDataHandler = (userData: any) => {
    appDispatch(loadUserData(userData));
  };

  const onLogin = (userCredentials: UserCredentialsProps) => {
    // login
    appDispatch(loginHandler(userCredentials));
  };
  const onLogout = () => {
    appDispatch(logoutHandler());
  };

  const onRegister = (userCredentials: UserCredentialsProps) => {
    appDispatch(registerHandler(userCredentials));
  };

  const onBlur = () => {
    setTimeout(() => {
      appDispatch(toggleAuthWindow());
    }, 150);
  };

  return (
    <div className={styles.app} id="outer-container">
      <MenuContext.Provider
        value={{ menuState: menuState, setMenuState: setMenuState }}
      >
        {!isPhoneWidth && (
          <SidebarMenuContainer
            isSidebarMenuHidden={isSidebarHidden}
            setIsSidebarMenuHidden={setIsSidebarHidden}
          />
        )}
        {isPhoneWidth && (
          <BurgerMenu
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
          />
        )}
        <div id="page-wrap">
          {!authSelector.isAuthorizing && (
            <MediaContainer isSidebarMenuHidden={isSidebarHidden} />
          )}
        </div>
        {authSelector.isAuthWindowOpen && (
          <AuthModal
            onLogin={onLogin}
            onLogout={onLogout}
            onRegister={onRegister}
            onBlur={onBlur}
          />
        )}
      </MenuContext.Provider>
    </div>
  );
}

export default App;
