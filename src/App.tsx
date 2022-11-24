import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SidebarMenuContainer from "./Components/SidebarMenu/SidebarMenuContainer";
import BurgerMenu from "./Components/SidebarMenu/BurgerMenu";
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
import Modal from "./UI/Modal";
import useHttp from "./hooks/useHttp";
import { loadUserData } from "./store/mediaSlice";
import "./sass/main.scss";
import SearchBar from "./UI/search-bar/Searchbar";
import ContentContainer from "./Components/Media/ContentContainer";

const SUBPAGES_LIST = ["home", "categories", "movies", "tvseries", "bookmarks"];
const FIREBASE_USERS_URL =
  "https://web-entertainment-app-default-rtdb.firebaseio.com/users";

function App() {
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  const [isPhoneWidth, setIsPhoneWidth] = useState(false);
  const appDispatch = useAppDispatch();
  const authSelector = useAppSelector((state) => state.auth);
  const { isLoading, error, sendRequest } = useHttp();
  let location = useLocation();

  // add window size listener
  useEffect(() => {
    const handleResize = () => {
      window.innerWidth < 490 ? setIsPhoneWidth(true) : setIsPhoneWidth(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  // add user status change listener
  useEffect(() => {
    auth.currentUser && loadUserDataHandler(auth.currentUser.uid);
    const subscribeUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        appDispatch(login(user.email));
        loadUserDataHandler(user.uid);
      } else {
        appDispatch(logoutHandler());
      }
    });
    subscribeUser();
  }, []);

  // React Router listener
  useEffect(() => {
    if (!authSelector.isAuthorizing) {
      const urlPath = location.pathname.slice(1);
      if (!SUBPAGES_LIST.includes(urlPath)) {
        return;
      }
      if (urlPath === "bookmarks") {
        !authSelector.isAuthorized
          ? appDispatch(setCategory("home"))
          : appDispatch(setCategory(urlPath));
      } else {
        appDispatch(setCategory(urlPath));
      }
    }
  }, [location, authSelector.isAuthorizing, authSelector.isAuthorized]);

  const loadUserDataHandler = async (uid: string) => {
    await sendRequest(
      {
        url: `${FIREBASE_USERS_URL}/${uid}.json`,
      },
      dispatchUserDataHandler
    );
  };

  const dispatchUserDataHandler = (userData: IuserData) => {
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
    <div className={"app"}>
      {!isPhoneWidth && (
        <SidebarMenuContainer
          isSidebarMenuHidden={isSidebarHidden}
          setIsSidebarMenuHidden={setIsSidebarHidden}
        />
      )}
      {isPhoneWidth && <BurgerMenu />}
      <SearchBar isSidebarMenuHidden={isSidebarHidden} />
      {!authSelector.isAuthorizing && (
        <ContentContainer isSidebarMenuHidden={isSidebarHidden} />
      )}
      {authSelector.isAuthWindowOpen && (
        <Modal
          onLogin={onLogin}
          onLogout={onLogout}
          onRegister={onRegister}
          onBlur={onBlur}
        />
      )}
    </div>
  );
}

export default App;
