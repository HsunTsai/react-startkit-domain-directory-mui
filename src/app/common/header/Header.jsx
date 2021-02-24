import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import { FormControlLabel, Switch } from '@material-ui/core';
import { changeLang, checkLanguageSupport, supportLanguages } from '../../appAction';
import Select from '../components/select/Select';

import ReactIcon from '../../../images/react_logo.png';

import './header.scss';

const Header = ({ pages, darkMode, setDarkMode }) => {
	const history = useHistory();
	const {
		url,
		params: { locale },
	} = useRouteMatch();

	return (
		<div className="header">
			<img alt="" className="header__icon" src={ReactIcon} />
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
			{/* <Select
				value={checkLanguageSupport(locale)}
				onChange={nextLanguage => changeLang({ history, currentLanguage: locale, nextLanguage })}
			>
				{supportLanguages.map(({ label, value }) => (
					<Option key={value} value={value}>
						{label}
					</Option>
				))}
			</Select> */}
		</div>
	);
};

Header.defaultProps = {
	darkMode: false,
	setDarkMode: () => {},
};

Header.propTypes = {
	pages: PropTypes.arrayOf(PropTypes.any).isRequired,
	darkMode: PropTypes.bool,
	setDarkMode: PropTypes.func,
};

export default Header;
