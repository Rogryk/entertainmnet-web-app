import { useState, useEffect } from "react";
import styles from "./App.module.scss";
import SidebarMenuContainer from "./Components/sidebar-menu/SidebarMenuContainer";
import MediaContainer from "./Components/Media/MediaContainer";
import MenuContext from "./store/menu-context";
import BurgerButton from "./Components/sidebar-menu/BurgerMenu";
import {
  toggleAuthWindow,
  registerHandler,
  logoutHandler,
  loginHandler,
  login,
} from "./store/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { auth } from "./utility/initFirebase";
import { onAuthStateChanged } from "firebase/auth";
import type { UserCredentialsProps } from "./store/authSlice";
import AuthModal from "./Components/UI/LoginRegister/AuthModal";

function App() {
  const [menuState, setMenuState] = useState("home");
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [isPhoneWidth, setIsPhoneWidth] = useState(false);
  const appDispatch = useAppDispatch();
  const authSelector = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 490 ? setIsPhoneWidth(true) : setIsPhoneWidth(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    console.log(
      Boolean(auth.currentUser?.email),
      Boolean(authSelector.isAuthorized)
    );

    onAuthStateChanged(auth, (user) => {
      if (user) {
        appDispatch(login(auth.currentUser?.email));
        console.log("logged in");
      } else {
        console.log("user signed out");
      }
    });
  }, []);

  const onLogin = (userCredentials: UserCredentialsProps) => {
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
          <BurgerButton
            pageWrapId={"page-wrap"}
            outerContainerId={"outer-container"}
          />
        )}
        <div id="page-wrap">
          <MediaContainer isSidebarMenuHidden={isSidebarHidden} />
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
