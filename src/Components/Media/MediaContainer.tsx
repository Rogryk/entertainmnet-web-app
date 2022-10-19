import React, { useState } from "react";
import ContentContainer from "./ContentContainer";
import Searchbar from "../search-bar/Searchbar";
import SearchContext from "../../store/search-context";
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
      <SearchContext.Provider
        value={{ searchText: searchText, setSearchText: setSearchText }}
      >
        <Searchbar />
        <ContentContainer />
      </SearchContext.Provider>
    </div>
  );
};

export default MediaContainer;
