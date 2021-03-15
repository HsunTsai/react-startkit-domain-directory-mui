import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { Fade, Box } from '@material-ui/core';
import ExpandLessSharpIcon from '@material-ui/icons/ExpandLessSharp';

import './backTop.scss';

const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

const BackTop = props => {
	const { className, visibilityHeight, children, onClick } = props;
	const [show, setShow] = useState(false);

	const scrollDebounce = useRef(
		debounce(() => {
			const top = window.scrollY;
			setShow(top >= visibilityHeight);
		}, 100)
	).current;

	useEffect(() => {
		// const scrollEvent = () => scrollDebounce.current;
		window.addEventListener('scroll', () => scrollDebounce());
		return () => {
			window.removeEventListener('scroll', () => scrollDebounce());
		};
	}, []);

	return (
		<Fade in={show} timeout={500} unmountOnExit>
			<div className={classNames('backTop', className)} onClick={() => scrollToTop() && onClick()}>
				{children && (
					<Box className="backTop__default" color="text.primary" bgcolor="primary.main" borderColor="text.secondary">
						<ExpandLessSharpIcon />
						Top
					</Box>
				)}
			</div>
		</Fade>
	);
};

BackTop.defaultProps = {
	className: undefined,
	visibilityHeight: 400,
	onClick: () => {},
	children: undefined,
};
BackTop.propTypes = {
	className: PropTypes.string,
	visibilityHeight: PropTypes.number,
	onClick: PropTypes.func,
	children: PropTypes.node,
};

export default BackTop;
