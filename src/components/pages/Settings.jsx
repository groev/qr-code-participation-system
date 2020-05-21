import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import scan from "../../assets/scan.svg";
import remove from "../../assets/remove.svg";

export default function Settings() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [custom, setCustom] = useState("");
  const [customValues, setCustomValues] = useState([]);

  const item = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  function addCustomValue() {
    if (!custom) return;
    setCustomValues([...customValues, custom]);
    setCustom("");
  }
  function removeCustomValue(idx) {
    setCustomValues(values => values.filter((img, i) => i !== idx));
  }

  function startScanning() {
    localStorage.setItem("email", email);
    localStorage.setItem("customValues", JSON.stringify(customValues));
    history.push("/scan");
  }

  return (
    <div id="Settings" className="container">
      <h1>Settings</h1>
      <div className="form">
        <div className="input-group">
          <label htmlFor="Email">E-Mail adress</label>
          <input
            value={email}
            id="Email"
            type="email"
            name="email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="CustomFields">Custom fields</label>
          <div className="flex">
            <input
              value={custom}
              id="CustomFields"
              type="text"
              name="custom-fields"
              onChange={e => setCustom(e.target.value)}
            />
            <button onClick={() => addCustomValue()} className="btn add">
              Add
            </button>
          </div>
        </div>
        <div className="custom-values">
          <AnimatePresence>
            {customValues &&
              customValues.map((value, idx) => {
                return (
                  <motion.div
                    key={idx}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    className="custom-value"
                  >
                    {value}
                    <div
                      className="remove"
                      onClick={() => removeCustomValue(idx)}
                    >
                      <img src={remove} alt="remove" />
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </div>
      {email && (
        <motion.div
          className="item"
          initial="hidden"
          animate="visible"
          variants={item}
        >
          <button onClick={startScanning} className="btn bottom">
            <img src={scan} alt="scan" />
            Start scanning
          </button>
        </motion.div>
      )}
    </div>
  );
}
