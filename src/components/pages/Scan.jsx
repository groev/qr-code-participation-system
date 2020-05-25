import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import QrReader from "react-qr-reader";
import axios from "axios";
import i18n from "../../util/i18n";

import { config } from "../../util";
import { Customer, Loader } from "../common";

import scan from "../../assets/scan.svg";
import close from "../../assets/close.svg";
import send from "../../assets/send.svg";

export default function Scan() {
  const history = useHistory();
  const [valuesFromStorage, setValuesFromStorage] = useState([]);
  const [values, setValues] = useState({});
  const [scanning, setScanning] = useState(false);
  const [customers, setCustomers] = useState([{}]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const customValues = JSON.parse(localStorage.getItem("customValues"));
    setValuesFromStorage(customValues);
    if (!customValues) history.push("/");
    customValues &&
      customValues.forEach(value => {
        setValues(values => ({ ...values, [value]: "" }));
      });
  }, [history]);

  function setCustomValues(e) {
    const target = e.target;
    setValues(values => ({ ...values, [target.name]: target.value }));
  }
  function handleScan(data) {
    if (data) {
      const dataObject = JSON.parse(data);
      addCustomer(dataObject);
    }
  }

  function handleScanError() {
    alert("Error while scanning.");
  }

  function addCustomer(data) {
    if (!data) return;
    setCustomers([...customers, data]);
    setScanning(false);
  }

  function removeCustomer(idx) {
    setCustomers(values => values.filter((val, i) => i !== idx));
  }

  function sendData() {
    setLoading(true);
    let valueString = "<strong>" + i18n.t("Custom fields") + ": </strong>\r\n";
    let customerString = "<strong>" + i18n.t("Customers") + ": </strong>\r\n";
    Object.keys(values).forEach(function(key) {
      valueString += key + ": " + values[key] + "\r\n";
    });
    customers.forEach((customer, idx) => {
      customerString += "" + i18n.t("Customer") + " #" + (idx + 1) + "\r\n";
      customerString +=
        i18n.t("First name") + ": " + customer.firstname + "\r\n";
      customerString += i18n.t("Last name") + ": " + customer.lastname + "\r\n";
      customerString += i18n.t("Street") + ":" + customer.street + "\r\n";
      customerString += i18n.t("ZIP") + ":" + customer.zip + "\r\n";
      customerString += i18n.t("City") + ": " + customer.city + "\r\n";
      customerString += i18n.t("Phone") + ": " + customer.phone + "\r\n\r\n";
    });
    const date = new Date();
    let data = {
      email: localStorage.getItem("email"),
      customers: customerString,
      values: valueString,
      title:
        i18n.t("New data has been submitted on") +
        " " +
        date.toLocaleDateString() +
        " | " +
        date.toLocaleTimeString(),
      date: date.toLocaleDateString() + " | " + date.toLocaleTimeString()
    };
    axios
      .post(config.mail, data)
      .then(response => {
        console.log(response);
        setLoading(false);
        history.push("/success");
      })
      .catch(error => {
        setLoading(false);
        if (error.response) {
          alert(error.response.data);
        } else {
          alert("Fehler aufgetreten");
        }
      });
  }

  function get_mailto_url() {
    const date = new Date();
    let valueString = i18n.t("Custom fields") + ": \r\n";
    let customerString = i18n.t("Customers") + ": \r\n";
    Object.keys(values).forEach(function(key) {
      valueString += key + ": " + values[key] + "\r\n";
    });
    customers.forEach((customer, idx) => {
      customerString += "" + i18n.t("Customer") + " #" + (idx + 1) + "\r\n";
      customerString +=
        i18n.t("First name") + ": " + customer.firstname + "\r\n";
      customerString += i18n.t("Last name") + ": " + customer.lastname + "\r\n";
      customerString += i18n.t("Street") + ":" + customer.street + "\r\n";
      customerString += i18n.t("ZIP") + ":" + customer.zip + "\r\n";
      customerString += i18n.t("City") + ": " + customer.city + "\r\n";
      customerString += i18n.t("Phone") + ": " + customer.phone + "\r\n\r\n";
    });

    let title =
      i18n.t("New data has been submitted on") +
      " " +
      date.toLocaleDateString() +
      " | " +
      date.toLocaleTimeString();
    let mailtoString =
      "mailto:" +
      localStorage.getItem("email") +
      "?subject=" +
      encodeURI(title) +
      "&body=" +
      encodeURI(title) +
      encodeURI("\r\n\r\n") +
      encodeURI(valueString) +
      encodeURI("\r\n\r\n") +
      encodeURI(customerString);
    return mailtoString;
  }

  function resetForm() {
    setCustomers([]);
    setValues([]);
  }

  return (
    <div id="Scan" className="container">
      {loading && <Loader />}
      <h1> {i18n.t("Add customers")}</h1>
      <div className="form">
        {valuesFromStorage &&
          valuesFromStorage.map((value, idx) => (
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
          {i18n.t("Add customer")}
        </button>{" "}
        <AnimatePresence>
          {scanning && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="qr-wrapper"
            >
              <QrReader
                delay={1000}
                onError={handleScanError}
                onScan={handleScan}
                style={{ width: "100%" }}
              />

              <img
                src={close}
                onClick={() => setScanning(false)}
                className="close"
                alt="close"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {customers.length ? (
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          href={get_mailto_url()}
        >
          <img src={send} alt="send" />
          {i18n.t("Send summary")}
        </a>
      ) : (
        ""
      )}
      {customers.length ? (
        <button className="btn secondary" onClick={e => resetForm()}>
          {i18n.t("New scan")}
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
