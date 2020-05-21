import React, { useState } from "react";
import scan from "../../assets/scan.svg";
import QRCode from "qrcode.react";

export default function Generate() {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    street: "",
    nr: "",
    zip: "",
    city: "",
    phone: ""
  });
  const [generated, setGenerated] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }
  function generateCode() {
    setGenerated(true);
  }
  function newCode() {
    setGenerated(false);
    setData({
      firstname: "",
      lastname: "",
      street: "",
      nr: "",
      zip: "",
      city: "",
      phone: ""
    });
  }
  return (
    <div id="Generate" className="container">
      {generated && (
        <div className="generate-wrapper">
          <QRCode size={200} value={JSON.stringify(data)} />
          <div>
            Save the Image or make a screenshot to make the Code reusable.
          </div>
          <button onClick={e => newCode()} className="btn bottom">
            <img src={scan} alt="scan" />
            Generate another code
          </button>
        </div>
      )}
      <h1>Fill out the form</h1>
      <div className="form">
        <div className="input-group">
          <label htmlFor="Firstname">First name</label>
          <input
            value={data.firstname}
            id="Firstname"
            type="text"
            name="firstname"
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="Lastname">Last name</label>
          <input
            value={data.lastname}
            id="Lastname"
            type="text"
            name="lastname"
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="flex">
          <div className="input-group" style={{ flexGrow: 2 }}>
            <label htmlFor="Street">Street</label>
            <input
              value={data.street}
              id="Street"
              type="text"
              name="street"
              onChange={e => handleChange(e)}
            />
          </div>
          <div
            className="input-group"
            style={{ width: "50px", marginLeft: "1rem" }}
          >
            <label htmlFor="Nr">Nr</label>
            <input
              value={data.nr}
              id="Nr"
              type="text"
              name="nr"
              onChange={e => handleChange(e)}
            />
          </div>
        </div>
        <div className="flex">
          <div
            className="input-group"
            style={{ width: "100px", marginRight: "1rem" }}
          >
            <label htmlFor="zip">ZIP</label>
            <input
              value={data.zip}
              id="zip"
              type="text"
              name="zip"
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="input-group" style={{ flexGrow: 2 }}>
            <label htmlFor="City">City</label>
            <input
              value={data.city}
              id="City"
              type="text"
              name="city"
              onChange={e => handleChange(e)}
            />
          </div>
        </div>
        <button onClick={e => generateCode()} className="btn bottom">
          <img src={scan} alt="scan" />
          Generate code
        </button>
      </div>
    </div>
  );
}
