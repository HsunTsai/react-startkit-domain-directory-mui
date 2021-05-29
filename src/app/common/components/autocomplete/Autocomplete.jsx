import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { CircularProgress, TextField, Chip } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Close, ExpandMore, SearchOutlined } from '@material-ui/icons';

import './autocomplete.scss';

const CustomAutocomplete = props => {
	const { options, value, defaultValue, loading } = props;
	const { className, multiple, freeTyping, noOptionsText, placeholder, searchIcon, renderInput, renderTags } = props;
	const { onChange, onSearch } = props;
	const defaultValueCheck = defaultValue ? [defaultValue] : [];
	const [keyword, setKeyword] = useState();
	const [selected, setSelected] = useState(multiple ? defaultValueCheck : defaultValue);

	const defaultTag = (tagValue, getTagProps) =>
		tagValue.map((option, index) => <Chip label={option.label} deleteIcon={<Close />} {...getTagProps({ index })} />);

	const handleSearch = useRef(debounce(_keyword => onSearch(_keyword), 500)).current;

	return (
		<div className={classNames('autocomplete', className)}>
			<Autocomplete
				options={(Array.isArray(options) && (freeTyping && keyword ? [{ label: keyword }].concat(options) : options)) || []}
				value={selected || value}
				defaultValue={selected}
				multiple={multiple}
				/* onEnter */
				onKeyDown={event => {
					if (event.keyCode === 13) {
						const result = { value: keyword, label: keyword };
						setSelected(result);
						onChange(result);
					}
				}}
				onChange={(event, object) => {
					const result = multiple ? [...object] : { ...object };
					setSelected(result);
					onChange(result);
				}}
				onInputChange={(event, _keyword) => {
					setKeyword(_keyword);
					handleSearch(_keyword);
				}}
				getOptionLabel={option => (option && option.label) || ''}
				renderInput={params =>
					renderInput || (
						<TextField
							{...params}
							variant="outlined"
							placeholder={placeholder}
							InputProps={{
								...params.InputProps,
								endAdornment: (
									<>
										{loading && <CircularProgress color="inherit" size={20} />}
										{searchIcon && <SearchOutlined className="autocomplete__icon " />}
										{params.InputProps.endAdornment}
									</>
								),
							}}
						/>
					)
				}
				renderTags={renderTags || defaultTag}
				popupIcon={<ExpandMore />}
				noOptionsText={noOptionsText}
			/>
		</div>
	);
};

CustomAutocomplete.defaultProps = {
	className: undefined,
	value: null,
	defaultValue: null,
	options: undefined,
	freeTyping: false,
	loading: false,
	searchIcon: true,
	multiple: false,
	placeholder: 'Search...',
	noOptionsText: 'No Options',
	renderInput: null,
	renderTags: null,
	onChange: () => {},
	onSearch: () => {},
};

CustomAutocomplete.propTypes = {
	className: PropTypes.string,
	value: PropTypes.objectOf(PropTypes.any),
	defaultValue: PropTypes.objectOf(PropTypes.any),
	options: PropTypes.arrayOf(PropTypes.any),
	freeTyping: PropTypes.bool,
	loading: PropTypes.bool,
	searchIcon: PropTypes.bool,
	multiple: PropTypes.bool,
	placeholder: PropTypes.string,
	noOptionsText: PropTypes.string,
	renderInput: PropTypes.func,
	renderTags: PropTypes.func,
	onChange: PropTypes.func,
	onSearch: PropTypes.func,
};

export default CustomAutocomplete;
