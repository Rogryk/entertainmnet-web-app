import React, { createContext, SetStateAction } from "react";

interface IMenuContext {
  menuState: string;
  setMenuState: React.Dispatch<SetStateAction<string>> | any;
}

const MenuContext = createContext<IMenuContext>({
  menuState: "",
  setMenuState: () => {},
});

export default MenuContext;
