import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import i18n from '../../util/i18n';

import menu from '../../assets/menu.svg';
import close from '../../assets/close.svg';

export default function Layout({ children }) {
	const history = useHistory();
	function doLogout() {
		localStorage.removeItem('email');
		localStorage.removeItem('customValues');
		window.location.reload();
	}
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<div id="Layout">
			<div id="Header">
				{i18n.t('AppTitle')}
				<div id="MenuButton" onClick={() => setMenuOpen(true)}>
					<img src={menu} alt="Menu" />
				</div>
			</div>
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						transition={{ ease: 'easeOut', duration: 0.2 }}
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
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
									{i18n.t('Start')}
								</Link>
							</li>
							<li>
								<Link onClick={() => setMenuOpen(false)} to="/scan">
									{i18n.t('Create new data')}
								</Link>
							</li>
							<li>
								<Link onClick={() => setMenuOpen(false)} to="/generate">
									{i18n.t('Generate code')}
								</Link>
							</li>

							<li onClick={doLogout}> {i18n.t('Clear data')}</li>
						</ul>
					</motion.div>
				)}
			</AnimatePresence>

			<div id="Content">{children}</div>
		</div>
	);
}
