import { createContext } from "react";
import { useState } from "react";

const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
  // usernav show/close
  const [menuShow, setMenuShow] = useState(false);
  const MenuOpen = () => {
    setMenuShow(!menuShow);
  };

  // search input effect
  const [inputWith, setInputWidth] = useState(true);

  // basvuru control
  const [successControl, setSuccessControl] = useState(false);

  const vals = {
    menuShow,
    setMenuShow,
    MenuOpen,
    inputWith,
    setInputWidth,
    successControl,
    setSuccessControl,
  };

  return (
    <GeneralContext.Provider value={vals}>{children}</GeneralContext.Provider>
  );
};

export default GeneralContext;
