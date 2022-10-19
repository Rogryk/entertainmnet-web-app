import React, { createContext, SetStateAction } from "react";

interface IElementContext {
  titleToBookmark: string;
  setTitleToBookmark: React.Dispatch<SetStateAction<string>>;
  titleToOpen: string;
  setTitleToOpen: React.Dispatch<SetStateAction<string>>;
}

const ElementContext = createContext<IElementContext>({
  titleToBookmark: "",
  setTitleToBookmark: () => {},
  titleToOpen: "",
  setTitleToOpen: () => {},
});

export default ElementContext;
