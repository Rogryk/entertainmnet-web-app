import React from "react";
import styles from "./Searchbar.module.scss";
import { IconSearch } from "@tabler/icons";

const SearchBar = () => {
  return (
    <div className={styles.searchbar}>
      <IconSearch className={styles.icon} />
      <input
        className={styles.input}
        type="text"
        name="searchbar"
        id="searchbar"
        placeholder="Search for movies or TV series"
      />
    </div>
  );
};

export default SearchBar;
