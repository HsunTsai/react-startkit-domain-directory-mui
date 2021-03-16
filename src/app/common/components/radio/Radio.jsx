import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import './radio.scss';

const CustomRadio = ({ defaultValue, ariaLabel, direction, style, name, onChange, options, ...rest }) => {
	const [value, setValue] = useState(defaultValue);
	return (
		<RadioGroup
			className="radioGroup"
			aria-label={ariaLabel}
			style={{ flexDirection: direction, ...style }}
			name={name}
			value={value}
			onChange={(evt, val) => {
				onChange(val);
				setValue(val);
			}}
			{...rest}
		>
			{options.map((item, i) => (
				<FormControlLabel value={item.value} key={i.toString()} control={<Radio disabled={item.disabled} />} label={item.label} />
			))}
		</RadioGroup>
	);
};

CustomRadio.defaultProps = {
	defaultValue: '',
	ariaLabel: '',
	direction: 'row',
	style: {},
	name: '',
	onChange: () => {},
	options: [],
};

CustomRadio.propTypes = {
	defaultValue: PropTypes.string,
	ariaLabel: PropTypes.string,
	direction: PropTypes.string,
	style: PropTypes.objectOf(PropTypes.any),
	name: PropTypes.string,
	onChange: PropTypes.func,
	options: PropTypes.arrayOf(PropTypes.any),
};

export default CustomRadio;
