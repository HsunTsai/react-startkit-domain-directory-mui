import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Fade } from '@material-ui/core';
import './customSpin.scss';

const CustomSpin = props => {
	const { spinning, children, containerAlign, ...rest } = props;

	return (
		<div className="customSpin" style={containerAlign}>
			<Fade in={spinning} style={{ transitionDelay: '100ms' }} unmountOnExit>
				<div className="customSpin__spin">
					<CircularProgress {...rest} />
				</div>
			</Fade>
			<div className="customSpin__main">{children}</div>
		</div>
	);
};

CustomSpin.defaultProps = {
	spinning: false,
	containerAlign: null,
	children: null,
};
CustomSpin.propTypes = {
	spinning: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.node]),
	containerAlign: PropTypes.objectOf(PropTypes.any),
};

export default CustomSpin;
