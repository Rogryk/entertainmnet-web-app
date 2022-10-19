import React, { useContext } from "react";
import styles from "./Searchbar.module.scss";
import { IconSearch } from "@tabler/icons";
import SearchContext from "../../store/search-context";

const SearchBar = () => {
  const searchCtx = useContext(SearchContext);

  const searchInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchCtx.setSearchText(event.target.value);
  };

  return (
    <div className={styles.searchbar}>
      <IconSearch className={styles.icon} />
      <input
        className={styles.input}
        type="text"
        name="searchbar"
        id="searchbar"
        placeholder="Search for movies or TV series"
        value={searchCtx.searchText}
        onChange={(event) => searchInputHandler(event)}
      />
    </div>
  );
};

export default SearchBar;
