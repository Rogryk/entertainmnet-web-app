import React, { useState } from "react";
import styles from "./App.module.scss";
import ContentElement from "./Components/Media/ContentElement";
import SidebarMenuContainer from "./Components/sidebar-menu/SidebarMenuContainer";
import MediaContainer from "./Components/Media/MediaContainer";
import MenuContext from "./store/menu-context";
import { store } from "./store/store";
import { Provider } from "react-redux";

function App() {
  const [menuState, setMenuState] = useState("home");
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);
  console.log(menuState);

  return (
    <div className={styles.app}>
      <Provider store={store}>
        <MenuContext.Provider
          value={{ menuState: menuState, setMenuState: setMenuState }}
        >
          <MediaContainer isSidebarMenuHidden={isSidebarHidden} />
          <SidebarMenuContainer
            isSidebarMenuHidden={isSidebarHidden}
            setIsSidebarMenuHidden={setIsSidebarHidden}
          />
        </MenuContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
