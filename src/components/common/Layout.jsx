import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import menu from "../../assets/menu.svg";
import close from "../../assets/close.svg";

export default function Layout({ children }) {
  const history = useHistory();
  function doLogout() {
    localStorage.removeItem("email");
    localStorage.removeItem("customValues");
    setMenuOpen(false);
    history.push("/");
    window.location.reload();
  }
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div id="Layout">
      <div id="Header">
        Who was there?
        <div id="MenuButton" onClick={() => setMenuOpen(true)}>
          <img src={menu} alt="Menu" />
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            id="Menu"
          >
            <img
              src={close}
              onClick={() => setMenuOpen(false)}
              alt="close"
              className="close"
            />
            <ul>
              <li>
                <Link onClick={() => setMenuOpen(false)} to="/">
                  Start
                </Link>
              </li>
              <li>
                <Link onClick={() => setMenuOpen(false)} to="/scan">
                  Create new data
                </Link>
              </li>
              <li>
                <Link onClick={() => setMenuOpen(false)} to="/generate">
                  Generate code
                </Link>
              </li>

              <li onClick={doLogout}>Clear data</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div id="Content">{children}</div>
    </div>
  );
}
