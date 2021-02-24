import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const CustomCheckbox = props => {
	const { value, onCheck, children, ...prop } = props;
	return (
		<FormControlLabel
			control={
				<Checkbox
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...prop}
					name={value}
					onChange={event => {
						onCheck(event && event.target && event.target.checked);
						event.stopPropagation();
					}}
				/>
			}
			label={children}
		/>
	);
};

CustomCheckbox.defaultProps = {
	value: undefined,
	onCheck: () => {},
	children: undefined,
};

CustomCheckbox.propTypes = {
	value: PropTypes.string,
	onCheck: PropTypes.func,
	children: PropTypes.string,
};

export default CustomCheckbox;
