import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Drawer, Divider } from '@material-ui/core';

const CustomDrawer = props => {
	const { title, width, placement, onClose, visible, children, ...prop } = props;
	const useStyles = makeStyles(theme => ({
		drawer: {
			width,
			flexShrink: 0,
		},
		drawerPaper: {
			width,
		},
		// necessary for content to be below app bar
		toolbar: theme.mixins.toolbar,
		content: {
			flexGrow: 1,
			backgroundColor: theme.palette.background.default,
			padding: theme.spacing(3),
		},
	}));
	const classes = useStyles();
	return (
		<Drawer
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...prop}
			anchor={placement}
			open={visible}
			onClose={onClose}
			onKeyDown={onClose}
			className={classes.drawer}
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<div className={classes.toolbar}>{title}</div>
			<Divider />
			{children}
		</Drawer>
	);
};
CustomDrawer.defaultProps = {
	title: '',
	width: 256,
	placement: 'right',
	onClose: () => {},
	visible: false,
	children: '',
};
CustomDrawer.propTypes = {
	title: PropTypes.node,
	width: PropTypes.number,
	placement: PropTypes.string,
	onClose: PropTypes.func,
	visible: PropTypes.bool,
	children: PropTypes.node,
};

export default CustomDrawer;
