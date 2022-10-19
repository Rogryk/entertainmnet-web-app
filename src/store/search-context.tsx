import React, { createContext, SetStateAction } from "react";

interface ISearchContext {
  searchText: string;
  setSearchText: React.Dispatch<SetStateAction<string>> | any;
}

const SearchContext = createContext<ISearchContext>({
  searchText: "",
  setSearchText: () => {},
});

export default SearchContext;
