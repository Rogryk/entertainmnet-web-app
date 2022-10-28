import React, { useContext } from "react";
import styles from "./Searchbar.module.scss";
import { IconSearch } from "@tabler/icons";
import SearchContext from "../../store/search-context";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { setSearchValue } from "../../store/navigationSlice";

const SearchBar = () => {
  const searchCtx = useContext(SearchContext);
  const appDispatch = useAppDispatch();
  const navSel = useAppSelector((state) => state.nav);

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
        value={navSel.searchValue}
        onChange={(event) => appDispatch(setSearchValue(event.target.value))}
      />
    </div>
  );
};

export default SearchBar;
