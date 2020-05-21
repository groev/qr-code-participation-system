import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { Customer } from "../common";
import scan from "../../assets/scan.svg";
import close from "../../assets/close.svg";

export default function Scan() {
  const [values, setValues] = useState({});
  const [scanning, setScanning] = useState(false);

  const [customers, setCustomers] = useState([
    {
      firstname: "Magnus",
      lastname: "Westhofen",
      street: "Turner Str. 41",
      nr: "41",
      zip: "42569",
      city: "Solingen",
      phone: "0173   835 653"
    }
  ]);

  const customValues = JSON.parse(localStorage.getItem("customValues"));
  function setCustomValues(e) {
    let newValues = values;
    newValues[e.target.name] = e.target.value;
    setValues(newValues);
  }
  function removeCustomer(idx) {
    setCustomers(values => values.filter((val, i) => i !== idx));
  }
  function addCustomer(data) {
    if (!data) return;
    setCustomers([...customValues, data]);
    setScanning(false);
  }
  function handleScan(data) {
    if (data) {
      const dataObject = JSON.parse(data);
      addCustomer(dataObject);
    }
  }
  function handleError() {
    alert("error");
    console.log("error");
  }
  return (
    <div id="Scan" className="container">
      <h1>Add customers</h1>

      <div className="form">
        {customValues &&
          customValues.map((value, idx) => (
            <div key={idx} className="input-group">
              <label>{value}</label>
              <input
                name={value}
                type="text"
                onChange={e => setCustomValues(e)}
                value={values[value]}
              />
            </div>
          ))}
        <div className="customers">
          {customers &&
            customers.map((customer, idx) => (
              <Customer
                key={idx}
                data={customer}
                index={idx}
                remove={removeCustomer}
              />
            ))}
        </div>
        <button className="btn" onClick={() => setScanning(true)}>
          <img src={scan} alt="scan" />
          Add customer
        </button>{" "}
        {scanning && (
          <div className="qr-wrapper">
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{ width: "100%" }}
            />

            <img
              src={close}
              onClick={() => setScanning(false)}
              className="close"
              alt="close"
            />
          </div>
        )}
      </div>
    </div>
  );
}
