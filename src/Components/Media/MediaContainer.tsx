import React, { useState } from "react";
import ContentContainer from "./ContentContainer";
import Searchbar from "../search-bar/Searchbar";
import styles from "./MediaContainer.module.scss";

const MediaContainer = ({
  isSidebarMenuHidden,
}: {
  isSidebarMenuHidden: boolean;
}) => {
  const [searchText, setSearchText] = useState("");
  return (
    <div
      className={`${styles.mediaContainer} ${
        isSidebarMenuHidden && styles.thin
      }`}
    >
      <Searchbar />
      <ContentContainer />
    </div>
  );
};

export default MediaContainer;
