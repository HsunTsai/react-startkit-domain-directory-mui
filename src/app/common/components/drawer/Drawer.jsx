import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import { DehazeRounded } from '@material-ui/icons';
import { changeLang, checkLanguageSupport, supportLanguages } from '../../../utils/languageTools';
import Select from '../select/Select';
import DrawerList from './DrawerList';

import './drawer.scss';

const CustomDrawer = ({ title, logo, drawerList }) => {
	const history = useHistory();
	const {
		params: { locale },
	} = useRouteMatch();
	const [open, setOpen] = useState(false);

	return (
		<div className="drawer">
			<IconButton className="drawer__icon" onClick={() => setOpen(true)}>
				<DehazeRounded />
			</IconButton>
			<Drawer anchor="right" open={open} onClose={() => setOpen(false)} onKeyDown={() => setOpen(false)}>
				{(logo || title) && (
					<div className="drawer__header">
						<div className="drawer__header-logo">{logo}</div>
						<div className="drawer__header-title">{title}</div>
					</div>
				)}
				<Divider />
				<DrawerList drawerList={drawerList.filter(({ showInHeader }) => showInHeader)} setOpen={setOpen} />
				<Divider />
				{/* 語系 */}
				<Select
					className="drawer__lang"
					value={checkLanguageSupport(locale)}
					onChange={event => changeLang({ history, currentLanguage: locale, nextLanguage: event.target.value })}
					options={supportLanguages}
				/>
			</Drawer>
		</div>
	);
};

CustomDrawer.defaultProps = {
	title: undefined,
	logo: undefined,
	drawerList: undefined,
};

CustomDrawer.propTypes = {
	title: PropTypes.string,
	logo: PropTypes.node,
	drawerList: PropTypes.arrayOf(PropTypes.any),
};

export default CustomDrawer;
