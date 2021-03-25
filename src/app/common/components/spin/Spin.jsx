import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { CircularProgress, Fade } from '@material-ui/core';

import './customSpin.scss';

const CustomSpin = props => {
	const { className, spinning, children, containerAlign } = props;

	return (
		<div className={classNames(className, 'customSpin')} style={containerAlign}>
			<Fade in={spinning} style={{ transitionDelay: '300ms' }} unmountOnExit>
				<div className="customSpin__spin">
					<CircularProgress />
				</div>
			</Fade>
			<div className="customSpin__main">{children}</div>
		</div>
	);
};

CustomSpin.defaultProps = {
	className: undefined,
	spinning: false,
	containerAlign: null,
	children: null,
};
CustomSpin.propTypes = {
	className: PropTypes.string,
	spinning: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
	containerAlign: PropTypes.objectOf(PropTypes.any),
};

export default CustomSpin;
