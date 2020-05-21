import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import menu from "../../assets/menu.svg";
import close from "../../assets/close.svg";

export default function Layout({ children }) {
  const history = useHistory();
  function doLogout() {
    localStorage.removeItem("email");
    localStorage.removeItem("customValues");
    setMenuOpen(false);
    history.push("/");
  }
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div id="Layout">
      <div id="Header">
        Who was there
        <div id="MenuButton" onClick={() => setMenuOpen(true)}>
          <img src={menu} alt="Menu" />
        </div>
      </div>
      {menuOpen && (
        <div id="Menu">
          <img
            src={close}
            onClick={() => setMenuOpen(false)}
            alt="close"
            className="close"
          />
          <ul>
            <li onClick={doLogout}>Log out</li>
          </ul>
        </div>
      )}
      <div id="Content">{children}</div>
    </div>
  );
}
