import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { Link } from '@material-ui/core';
import './backTop.scss';

const BackTop = props => {
	const { duration, visibilityHeight, onClick, children, ...prop } = props;
	const [visible, setVisible] = useState(false);
	const handleClick = () => {
		onClick();
		$('html,body').animate({ scrollTop: 0 }, duration);
	};
	const handleScroll = () => {
		const scrollTop = window.scrollY;
		setVisible(scrollTop >= visibilityHeight);
	};
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return (
		visible && (
			<Link className="BackTop" onClick={handleClick} component="button" {...prop}>
				{children}
			</Link>
		)
	);
};

BackTop.defaultProps = {
	duration: 450,
	visibilityHeight: 400,
	onClick: () => {},
	children: '',
};
BackTop.propTypes = {
	duration: PropTypes.number,
	visibilityHeight: PropTypes.number,
	onClick: PropTypes.func,
	children: PropTypes.node,
};

export default BackTop;
