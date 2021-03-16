import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

const DrawerList = ({ drawerList, setOpen }) => {
	const history = useHistory();
	const intl = useIntl();
	return (
		<List className="drawer__list">
			{Array.isArray(drawerList) &&
				drawerList.map(({ name, icon, path }, index) => (
					<ListItem
						button
						key={index.toString()}
						onClick={() => {
							history.push({ pathname: `/${intl.locale}${path}` });
							setOpen(false);
						}}
					>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText primary={name} />
					</ListItem>
				))}
		</List>
	);
};

DrawerList.propTypes = {
	drawerList: PropTypes.arrayOf(PropTypes.any).isRequired,
	setOpen: PropTypes.func.isRequired,
};

export default DrawerList;
