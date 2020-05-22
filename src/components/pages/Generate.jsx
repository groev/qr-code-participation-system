import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';

import scan from '../../assets/scan.svg';

export default function Generate() {
	const [data, setData] = useState({
		firstname: '',
		lastname: '',
		street: '',
		zip: '',
		city: '',
		phone: '',
	});
	const [errors, setErrors] = useState([]);
	const [generated, setGenerated] = useState(false);
	function handleChange(e) {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
		if (value) {
			setErrors((errors) => errors.filter((error) => error !== name));
		}
	}
	function generateCode(e) {
		e.preventDefault();
		const errorArray = [];
		Object.keys(data).forEach((field) => {
			if (!data[field] || data[field] === '') errorArray.push(field);
		});
		setErrors(errorArray);
		console.log(errorArray);
		if (errorArray.length > 0) {
			return;
		}
		setGenerated(true);
	}
	function newCode() {
		setGenerated(false);
		setData({
			firstname: '',
			lastname: '',
			street: '',
			zip: '',
			city: '',
			phone: '',
		});
	}
	useEffect(() => {}, [errors]);
	function checkError(field) {
		if (errors.find((error) => error === field)) {
			return 'error';
		}
	}
	return (
		<div id="Generate" className="container">
			<AnimatePresence>
				{generated && (
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						exit={{ scale: 0 }}
						className="generate-wrapper"
					>
						<QRCode size={200} value={JSON.stringify(data)} />
						<div>
							Save the Image or make a screenshot to make the Code reusable.
						</div>
						<button onClick={(e) => newCode()} className="btn bottom">
							<img src={scan} alt="scan" />
							Generate another code
						</button>
					</motion.div>
				)}
			</AnimatePresence>
			<h1>Fill out the form</h1>
			<div className="form">
				<form onSubmit={(e) => generateCode(e)} autocomplete="on">
					<div className="input-group">
						<label htmlFor="Firstname">First name</label>
						<input
							value={data.firstname}
							id="Firstname"
							autoComplete="given-name"
							type="text"
							name="firstname"
							className={checkError('firstname')}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="input-group">
						<label htmlFor="Lastname">Last name</label>
						<input
							value={data.lastname}
							autoComplete="family-name"
							id="Lastname"
							type="text"
							name="lastname"
							className={checkError('lastname')}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="input-group">
						<label htmlFor="Street">Street</label>
						<input
							value={data.street}
							id="Street"
							type="text"
							name="street"
							className={checkError('street')}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className="flex">
						<div
							className="input-group"
							style={{ width: '100px', marginRight: '1rem' }}
						>
							<label htmlFor="zip">ZIP</label>
							<input
								value={data.zip}
								id="zip"
								type="number"
								name="zip"
								className={checkError('zip')}
								onChange={(e) => handleChange(e)}
								autoComplete="postal-code"
							/>
						</div>
						<div className="input-group" style={{ flexGrow: 2 }}>
							<label htmlFor="City">City</label>
							<input
								value={data.city}
								id="City"
								type="text"
								name="city"
								className={checkError('city')}
								onChange={(e) => handleChange(e)}
							/>
						</div>
					</div>
					<div className="input-group">
						<label htmlFor="Phone">Phone</label>
						<input
							value={data.phone}
							id="Phone"
							type="tel"
							autoComplete="tel"
							name="phone"
							className={checkError('phone')}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<button type="submit" className="btn bottom">
						<img src={scan} alt="scan" />
						Generate code
					</button>
				</form>
			</div>
		</div>
	);
}
