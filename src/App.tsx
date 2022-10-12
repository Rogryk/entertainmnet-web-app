import React from "react";
import styles from "./App.module.scss";
import ContentElement from "./Components/Media/ContentElement";
import SidebarMenuContainer from "./Components/sidebar-menu/SidebarMenuContainer";
import MediaContainer from "./Components/Media/MediaContainer";

function App() {
  return (
    <div className={styles.app}>
      <MediaContainer />
      <SidebarMenuContainer />
    </div>
  );
}

export default App;
