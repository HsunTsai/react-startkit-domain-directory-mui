export const colors = {
	primaryColor: '#0087DC',
	primaryColorFocus: '#339fe3',
	secondaryColor: '#ffc400',
	borderColor: '#d9d9d9',
};

export const antTheme = ({ darkMode }) => {
	const { primaryColor, secondaryColor, borderColor } = colors;
	return {
		typography: { button: { textTransform: 'none' } },
		palette: darkMode
			? { type: 'dark', primary: { main: primaryColor }, secondary: { main: secondaryColor } }
			: { type: 'light', primary: { main: primaryColor }, secondary: { main: secondaryColor } },
		shape: { borderRadius: 3 },
		props: {
			MuiButton: { variant: 'contained', color: 'primary' },
			MuiSelect: {
				// 讓下拉選單可以沿著Select下緣跳出
				MenuProps: {
					anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
					transformOrigin: { vertical: 'top', horizontal: 'left' },
					getContentAnchorEl: null,
				},
			},
		},
		overrides: {
			MuiPaper: { root: { background: 'white', minWidth: 300 } },
			MuiSelect: { root: { padding: 8 } },
			MuiButton: { root: { padding: '4px 8px', '&$outlined': { padding: '4px 8px' } } },
			MuiAutocomplete: {
				inputRoot: {
					backgroundColor: darkMode ? '#303030' : '#fff',
					'&:hover .MuiOutlinedInput-notchedOutline': { borderColor: primaryColor },
				},
			},
			MuiChip: {
				root: {
					height: '28px',
					borderRadius: '2px',
					backgroundColor: darkMode ? '#595959' : '#f5f5f5',
					border: '1px solid',
					borderColor: darkMode ? '#8c8c8c' : borderColor,
				},
			},
			MuiOutlinedInput: {
				root: {
					borderColor,
					'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
						borderWidth: '1px',
						boxShadow: '0 0 0 2px rgb(24 144 255 / 20%)',
					},
				},
			},
			MuiRadio: {
				colorSecondary: {
					'&.Mui-checked': {
						color: primaryColor,
					},
				},
			},
		},
	};
};
