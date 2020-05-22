import React from 'react';
import { Link } from 'react-router-dom';
import i18n from '../../util/i18n';

import scan from '../../assets/scan.svg';

export default function Success() {
	return (
		<div id="Success" className="container">
			<h1>{i18n.t('Success')}!</h1>
			<div>
				{i18n.t('Your summary has succesfully been send to')}{' '}
				<span className="email">{localStorage.getItem('email')}</span>
			</div>
			<Link to="/scan" className="btn bottom">
				<img src={scan} alt="scan" />
				{i18n.t('Scan again')}
			</Link>
		</div>
	);
}
