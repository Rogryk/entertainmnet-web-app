import { IconSearch } from "@tabler/icons";
import { setSearchValue } from "../../store/navigationSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import styles from "./Searchbar.module.scss";

interface SearchbarProps {
  isSidebarMenuHidden: boolean;
}

const SearchBar = (props: SearchbarProps) => {
  const appDispatch = useAppDispatch();
  const navSel = useAppSelector((state) => state.nav);

  const position = props.isSidebarMenuHidden ? "fullView" : "collapsedView";
  return (
    <section
      role="search"
      className={`searchbar position dimensions ${position} ${styles.styles}`}
    >
      <IconSearch className={styles.icon} />
      <input
        type="text"
        name="searchbar"
        id="searchbar"
        placeholder="Search for movies or TV series"
        value={navSel.searchValue}
        onChange={(event) => appDispatch(setSearchValue(event.target.value))}
      />
    </section>
  );
};

export default SearchBar;
