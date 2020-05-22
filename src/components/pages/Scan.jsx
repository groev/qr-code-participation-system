import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import QrReader from 'react-qr-reader';
import axios from 'axios';

import { config } from '../../util';
import { Customer, Loader } from '../common';

import scan from '../../assets/scan.svg';
import close from '../../assets/close.svg';
import send from '../../assets/send.svg';

export default function Scan() {
	const history = useHistory();
	const [valuesFromStorage, setValuesFromStorage] = useState([]);
	const [values, setValues] = useState({});
	const [scanning, setScanning] = useState(false);
	const [customers, setCustomers] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const customValues = JSON.parse(localStorage.getItem('customValues'));
		setValuesFromStorage(customValues);
		if (!customValues) history.push('/');
		customValues &&
			customValues.forEach((value) => {
				setValues((values) => ({ ...values, [value]: '' }));
			});
	}, []);

	function setCustomValues(e) {
		const target = e.target;
		setValues((values) => ({ ...values, [target.name]: target.value }));
	}

	function handleScan(data) {
		if (data) {
			const dataObject = JSON.parse(data);
			addCustomer(dataObject);
		}
	}

	function handleScanError() {
		alert('Error while scanning.');
	}

	function addCustomer(data) {
		if (!data) return;
		setCustomers([...customers, data]);
		setScanning(false);
	}

	function removeCustomer(idx) {
		setCustomers((values) => values.filter((val, i) => i !== idx));
	}

	function sendData() {
		setLoading(true);
		let valueString = '<strong>Values: </strong><br />';
		let customerString = '<strong>Customers: </strong><br />';

		Object.keys(values).forEach(function (key) {
			valueString += key + ': ' + values[key] + '<br />';
		});

		customers.forEach((customer, idx) => {
			customerString += 'Customer #' + (idx + 1) + '<br />';
			customerString += 'First name: ' + customer.firstname + '<br />';
			customerString += 'Last name: ' + customer.lastname + '<br />';
			customerString += 'Street: ' + customer.street + '<br />';
			customerString += 'Zip: ' + customer.zip + '<br />';
			customerString += 'City: ' + customer.city + '<br />';
			customerString += 'Phone: ' + customer.phone + '<br /><br />';
		});

		const date = new Date();

		let data = {
			email: localStorage.getItem('email'),
			customers: customerString,
			values: valueString,
			date: date.toLocaleDateString() + ' | ' + date.toLocaleTimeString(),
		};

		axios
			.post(config.mail, { data })
			.then((response) => {
				setLoading(false);
				console.log(response);
				history.push('/success');
			})
			.catch((error) => {
				setLoading(false);
				alert('Error while sending');
			});
	}
	return (
		<div id="Scan" className="container">
			{loading && <Loader />}
			<h1>Add customers</h1>
			<div className="form">
				{valuesFromStorage &&
					valuesFromStorage.map((value, idx) => (
						<div key={idx} className="input-group">
							<label>{value}</label>
							<input
								name={value}
								type="text"
								onChange={(e) => setCustomValues(e)}
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
				</button>{' '}
				<AnimatePresence>
					{scanning && (
						<motion.div
							initial={{ y: '100%' }}
							animate={{ y: 0 }}
							exit={{ y: '100%' }}
							className="qr-wrapper"
						>
							<QrReader
								delay={1000}
								onError={handleScanError}
								onScan={handleScan}
								style={{ width: '100%' }}
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
				<button onClick={(e) => sendData()} className="btn bottom">
					<img src={send} alt="send" />
					Send summary
				</button>
			) : (
				''
			)}
		</div>
	);
}
