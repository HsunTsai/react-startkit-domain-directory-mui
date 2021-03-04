import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Chip } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Close, ExpandMore } from '@material-ui/icons';
import Spin from '../spin/Spin';
import './autocomplete.scss';

const CustomAutocomplete = props => {
	const {
		options,
		value,
		defaultValue,
		multiple,
		onChange,
		onSearch,
		renderInput,
		renderTags,
		placeholder,
		loading,
		loadingText,
		...rest
	} = props;
	const defaultValueCheck = defaultValue ? [defaultValue] : [];
	const [selected, setSelected] = useState(multiple ? defaultValueCheck : defaultValue);

	const defaultInput = params => (
		<Spin spinning={loading}>
			<TextField {...params} variant="outlined" placeholder={placeholder} />
		</Spin>
	);
	const defaultTag = (tagValue, getTagProps) =>
		tagValue.map((option, index) => <Chip label={option.label} deleteIcon={<Close />} {...getTagProps({ index })} />);

	return (
		<div className="autocomplete">
			<Autocomplete
				options={options}
				value={value || selected}
				defaultValue={selected}
				multiple={multiple}
				onChange={(event, object) => {
					const newObject = multiple ? [...object] : { ...object };
					setSelected(newObject);
					onChange(newObject);
				}}
				onInputChange={(event, newValue) => onSearch(newValue)}
				getOptionLabel={option => (option && option.label) || ''}
				renderInput={renderInput || defaultInput}
				renderTags={renderTags || defaultTag}
				loadingText={loadingText}
				popupIcon={<ExpandMore />}
				{...rest}
			/>
		</div>
	);
};

CustomAutocomplete.defaultProps = {
	options: [],
	value: null,
	defaultValue: null,
	multiple: false,
	placeholder: 'Search...',
	noOptionsText: 'No Options',
	loading: false,
	loadingText: 'Loading...',
	onChange: () => {},
	onSearch: () => {},
	renderInput: null,
	renderTags: null,
};

CustomAutocomplete.propTypes = {
	options: PropTypes.arrayOf(PropTypes.any),
	value: PropTypes.objectOf(PropTypes.any),
	defaultValue: PropTypes.objectOf(PropTypes.any),
	multiple: PropTypes.bool,
	placeholder: PropTypes.string,
	noOptionsText: PropTypes.string,
	loading: PropTypes.bool,
	loadingText: PropTypes.node,
	onChange: PropTypes.func,
	onSearch: PropTypes.func,
	renderInput: PropTypes.func,
	renderTags: PropTypes.func,
};

export default CustomAutocomplete;
