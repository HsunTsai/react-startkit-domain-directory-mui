import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import { FormControlLabel, Switch } from '@material-ui/core';
import { changeLang, checkLanguageSupport, supportLanguages } from '../../utils/languageTools';
import Select from '../components/select/Select';
import Drawer from '../components/drawer/Drawer';

import './header.scss';

const Header = ({ title, logo, pages, darkMode, setDarkMode }) => {
	const history = useHistory();
	const [hideHeader, setHideHeader] = useState(false);
	const {
		url,
		params: { locale },
	} = useRouteMatch();

	const handleScroll = useRef(debounce(() => setHideHeader(window.scrollY > 100), 10)).current;

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<div className={classNames('header', { 'header--hide': hideHeader })}>
			{logo}
			<div className="header__title">{title}</div>
			{/* page links */}
			<div className="header__links">
				{pages
					.filter(({ showInHeader }) => showInHeader)
					.map(({ path, name }) => (
						<NavLink
							key={path}
							to={`${url}${path}`}
							className="header__links__item"
							activeClassName="header__links__item--active"
						>
							{name}
						</NavLink>
					))}
			</div>
			{/* 色系轉換 */}
			<FormControlLabel
				control={<Switch checked={darkMode} onChange={event => setDarkMode(event.target.checked)} color="secondary" />}
				label="Dark"
			/>
			{/* 語系 */}
			<Select
				value={checkLanguageSupport(locale)}
				onChange={event => changeLang({ history, currentLanguage: locale, nextLanguage: event.target.value })}
				options={supportLanguages}
			/>
			<Drawer title={title} logo={logo} drawerList={pages} />
		</div>
	);
};

Header.defaultProps = {
	title: undefined,
	logo: undefined,
	darkMode: false,
	setDarkMode: () => {},
};

Header.propTypes = {
	title: PropTypes.string,
	logo: PropTypes.node,
	pages: PropTypes.arrayOf(PropTypes.any).isRequired,
	darkMode: PropTypes.bool,
	setDarkMode: PropTypes.func,
};

export default Header;
