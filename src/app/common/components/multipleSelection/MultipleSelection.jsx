import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Chip } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const CustomMultipleSelection = props => {
	const { options, value, defaultValue, onChange, onSearch, renderInput, renderTags, placeholder, ...rest } = props;
	const [selected, setSelected] = useState(defaultValue);
	const defaultInput = params => <TextField {...params} variant="outlined" placeholder={placeholder} />;
	const defaultTag = (tagValue, getTagProps) =>
		tagValue.map((option, index) => <Chip label={option.title} {...getTagProps({ index })} />);

	return (
		<Autocomplete
			multiple
			value={value || selected}
			onChange={(event, newValue) => {
				setSelected(newValue);
				onChange(newValue);
			}}
			defaultValue={defaultValue}
			onInputChange={(event, newValue) => onSearch(newValue)}
			options={options}
			getOptionLabel={option => option.label}
			renderTags={renderTags || defaultTag}
			renderInput={renderInput || defaultInput}
			{...rest}
		/>
	);
};

CustomMultipleSelection.defaultProps = {
	options: [],
	value: null,
	defaultValue: null,
	placeholder: 'Search...',
	noOptionsText: 'No Options',
	loading: false,
	loadingText: 'Loading...',
	onChange: () => {},
	onSearch: () => {},
	renderInput: null,
	renderTags: null,
};

CustomMultipleSelection.propTypes = {
	options: PropTypes.arrayOf(PropTypes.any),
	value: PropTypes.objectOf(PropTypes.any),
	defaultValue: PropTypes.objectOf(PropTypes.any),
	placeholder: PropTypes.string,
	noOptionsText: PropTypes.string,
	loading: PropTypes.bool,
	loadingText: PropTypes.string,
	onChange: PropTypes.func,
	onSearch: PropTypes.func,
	renderInput: PropTypes.func,
	renderTags: PropTypes.func,
};

export default CustomMultipleSelection;
