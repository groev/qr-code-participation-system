import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import i18n from '../../util/i18n';

import more from '../../assets/more.svg';
import phone from '../../assets/phone.svg';
import marker from '../../assets/marker.svg';

export default function Customer({ index, data, remove }) {
	const [moreVisible, setMoreVisible] = useState(false);

	function showHide() {
		if (moreVisible) {
			setMoreVisible(false);
		} else {
			setMoreVisible(true);
		}
	}

	return (
		<AnimatePresence>
			<motion.div
				initial={{ x: '100%' }}
				animate={{ x: 0 }}
				exit={{ x: '100%' }}
				className="customer"
				onClick={(e) => showHide()}
			>
				<div className="head">
					{index + 1}. {data.firstname} {data.lastname}
					<div className="more">
						{moreVisible && <img src={more} alt="more" className="less-img" />}
						{!moreVisible && <img src={more} alt="more" className="more-img" />}
					</div>
					{moreVisible && (
						<div className="content">
							<div className="adress">
								<img src={marker} alt="Marker" />
								<div>
									{data.street}
									<br />
									{data.zip} {data.city}
								</div>
							</div>
							<div className="phone">
								<img src={phone} alt="Marker" />
								<div>{data.phone}</div>
							</div>
							<div className="remove" onClick={(e) => remove(index)}>
								{i18n.t('remove')}
							</div>
						</div>
					)}
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
