import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Select, MenuItem } from '@material-ui/core';

const CustomSelect = props => {
	const { options, ...prop } = props;
	return (
		<FormControl variant="outlined">
			{/* eslint-disable-next-line react/jsx-props-no-spreading */}
			<Select {...prop}>
				{Array.isArray(options) &&
					options.map(({ label, value }) => (
						<MenuItem key={value} value={value}>
							{label}
						</MenuItem>
					))}
			</Select>
		</FormControl>
	);
};

CustomSelect.defaultProps = {
	options: [],
};

CustomSelect.propTypes = {
	options: PropTypes.arrayOf(PropTypes.any),
};

export default CustomSelect;
