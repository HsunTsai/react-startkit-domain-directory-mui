import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import { DehazeRounded } from '@material-ui/icons';
import DrawerList from './DrawerList';

import './drawer.scss';

const CustomDrawer = ({ title, logo, drawerList }) => {
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
				<DrawerList drawerList={drawerList} setOpen={setOpen} />
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
