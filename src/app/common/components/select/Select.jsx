import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Select, MenuItem } from '@material-ui/core';

const CustomSelect = props => {
	const { options, placeholder, ...prop } = props;
	return (
		<FormControl variant="outlined">
			<Select displayEmpty {...prop}>
				{placeholder && (
					<MenuItem disabled value="">
						<div style={{ color: '#AAA', fontSize: '1rem' }}>{placeholder}</div>
					</MenuItem>
				)}
				{Array.isArray(options) &&
					options.map(option => {
						const { label, value } = typeof option === 'object' ? option : { label: option, value: option };
						return (
							<MenuItem key={value} value={value}>
								{label}
							</MenuItem>
						);
					})}
			</Select>
		</FormControl>
	);
};

CustomSelect.defaultProps = {
	options: [],
	placeholder: undefined,
};

CustomSelect.propTypes = {
	options: PropTypes.arrayOf(PropTypes.any),
	placeholder: PropTypes.string,
};

export default CustomSelect;
