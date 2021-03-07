import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, useRouteMatch, useHistory } from 'react-router-dom';
import { FormControlLabel, Switch, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import { Inbox, Drafts, Dehaze } from '@material-ui/icons';
import { changeLang, checkLanguageSupport, supportLanguages } from '../../appAction';
import Select from '../components/select/Select';
import Drawer from '../components/drawer/Drawer';
import ReactIcon from '../../../images/react_logo.png';

import './header.scss';

const Header = ({ pages, darkMode, setDarkMode }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const history = useHistory();
	const {
		url,
		params: { locale },
	} = useRouteMatch();

	const useStyles = makeStyles(theme => ({
		margin: {
			margin: theme.spacing(0),
		},
		extendedIcon: {
			marginRight: theme.spacing(1),
		},
	}));
	const classes = useStyles();
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
			<IconButton aria-label="delete" className={classes.margin} onClick={() => setDrawerOpen(true)}>
				<Dehaze />
			</IconButton>
			<Drawer
				title={
					<div className="header-logo">
						<img alt="" className="header__icon" src={ReactIcon} />
					</div>
				}
				width={300}
				placement="right"
				onClose={() => setDrawerOpen(false)}
				visible={drawerOpen}
			>
				<List component="nav" aria-label="main mailbox folders">
					<ListItem button>
						<ListItemIcon>
							<Inbox />
						</ListItemIcon>
						<ListItemText primary="Inbox" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<Drafts />
						</ListItemIcon>
						<ListItemText primary="Drafts" />
					</ListItem>
				</List>
			</Drawer>
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
