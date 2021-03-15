import React, { useContext, useMemo, useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch, Redirect } from 'react-router-dom';
/* You can cache page when page cahnge by import CacheRoute & CacheSwitch */
// import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import Loadable from 'react-loadable';
import { useSnackbar } from 'notistack';
import { AccessTimeSharp, Inbox, Drafts } from '@material-ui/icons';

import { ReducerContext } from '../IndexProvider';
import Header from './common/header/Header';
import RouterLoading from './common/loading/Loading';
import { LOAD_SNACK_BAR } from './appAction';
import ReactIcon from '../images/react_logo.png';

const pages = [
	{
		path: '/components',
		name: 'Components',
		icon: <AccessTimeSharp />,
		component: Loadable({ loader: () => import('./pages/components/Components'), loading: RouterLoading }),
	},
	{
		path: '/home',
		name: 'Home',
		icon: <Inbox />,
		component: Loadable({ loader: () => import('./pages/home/Home'), loading: RouterLoading }),
	},
	{
		path: '/about',
		name: 'About',
		icon: <Drafts />,
		component: Loadable({ loader: () => import('./pages/about/About'), loading: RouterLoading }),
	},
	{
		path: '/topic',
		name: 'Topic',
		icon: <AccessTimeSharp />,
		component: Loadable({ loader: () => import('./pages/topic/Topic'), loading: RouterLoading }),
	},
	{
		path: '/loading',
		name: 'Loading',
		component: RouterLoading,
	},
];

const primaryColor = '#0087DC';
// const primaryColorFocus = '#339fe3';

const secondaryColor = '#ffc400';
const borderColor = '#d9d9d9';

const App = () => {
	// eslint-disable-next-line no-unused-vars
	const [state, dispatch] = useContext(ReducerContext);

	/* default systme color mode */
	const [darkMode, setDarkMode] = useState(useMediaQuery('(prefers-color-scheme: dark)'));
	const theme = useMemo(
		() =>
			createMuiTheme({
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
					// MuiSelect: { root: { padding: 8, backgroundColor: 'white', '&$selected&:focus': { backgroundColor: 'white' } } },
					// MuiList: { root: { backgroundColor: 'white' } },
					// MuiMenuItem: {
					// 	root: {
					// 		'&$selected': { backgroundColor: 'white' },
					// 		'&:hover': { backgroundColor: primaryColorFocus, color: 'white' },
					// 		'&$selected&:hover': { backgroundColor: primaryColorFocus, color: 'white' },
					// 	},
					// },
				},
			}),
		[darkMode]
	);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	useEffect(() => {
		dispatch({ type: LOAD_SNACK_BAR, enqueueSnackbar, closeSnackbar });
	}, [enqueueSnackbar, closeSnackbar]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<div className="app">
				<Header
					title="React Demo"
					logo={<img alt="" className="app__icon" src={ReactIcon} />}
					pages={pages}
					darkMode={darkMode}
					setDarkMode={setDarkMode}
				/>
				<Switch>
					{pages.map((page, index) => (
						<Route key={index.toString()} path={`/:locale${page.path}`} component={page.component} />
					))}
					<Redirect to={pages[0].path} />
				</Switch>
			</div>
		</ThemeProvider>
	);
};

export default hot(App);
