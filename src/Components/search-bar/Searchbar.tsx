import { IconSearch } from "@tabler/icons";
import { setSearchValue } from "../../store/navigationSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import styles from "./Searchbar.module.scss";

const SearchBar = () => {
  const appDispatch = useAppDispatch();
  const navSel = useAppSelector((state) => state.nav);

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
