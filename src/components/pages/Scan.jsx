import React, { useState } from "react";
import QrReader from "react-qr-reader";
import { Customer } from "../common";
import scan from "../../assets/scan.svg";

export default function Scan() {
  const [values, setValues] = useState({});
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
  function handleScan() {
    console.log("scanned");
  }
  function handleError() {
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
        <button className="btn">
          <img src={scan} alt="scan" />
          Add customer
        </button>{" "}
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}
