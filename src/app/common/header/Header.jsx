import React from 'react';
import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
import { NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import { FormControlLabel, Switch } from '@material-ui/core';
import { changeLang, checkLanguageSupport, supportLanguages } from '../../appAction';
import Select from '../components/select/Select';
import Drawer from '../components/drawer/Drawer';

import './header.scss';

const Header = ({ title, logo, pages, darkMode, setDarkMode }) => {
	const history = useHistory();
	const {
		url,
		params: { locale },
	} = useRouteMatch();

	return (
		<div className="header">
			{logo}
			<div className="header__title">{title}</div>
			{/* page links */}
			<div className="header__links">
				{pages.map(page => (
					<NavLink
						key={page.path}
						to={`${url}${page.path}`}
						className="header__links-item"
						activeClassName="header__links-item--active"
					>
						{page.name}
					</NavLink>
				))}
			</div>
			{/* Setting color mode (dark or light) */}
			<FormControlLabel
				control={<Switch checked={darkMode} onChange={event => setDarkMode(event.target.checked)} color="secondary" />}
				label="Dark"
			/>
			{/* <InputLabel htmlFor="outlined-age-native-simple">Age</InputLabel> */}
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
