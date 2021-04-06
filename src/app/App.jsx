import React, { useContext, useMemo, useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useIntl } from 'react-intl';
/* You can cache page when page cahnge by import CacheRoute & CacheSwitch */
// import CacheRoute, { CacheSwitch } from 'react-router-cache-route';
import Loadable from 'react-loadable';
import { useSnackbar } from 'notistack';
import { AccessTimeSharp, Inbox, Drafts } from '@material-ui/icons';
import { antTheme } from './utils/antTheme';

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
		showInHeader: true,
		component: Loadable({ loader: () => import('./pages/components/Components'), loading: RouterLoading }),
	},
	{
		path: '/home',
		name: 'Home',
		icon: <Inbox />,
		showInHeader: true,
		component: Loadable({ loader: () => import('./pages/home/Home'), loading: RouterLoading }),
	},
	{
		path: '/about',
		name: 'About',
		icon: <Drafts />,
		showInHeader: true,
		component: Loadable({ loader: () => import('./pages/about/About'), loading: RouterLoading }),
	},
	{
		path: '/topic',
		name: 'Topic',
		icon: <AccessTimeSharp />,
		showInHeader: true,
		component: Loadable({ loader: () => import('./pages/topic/Topic'), loading: RouterLoading }),
	},
	{
		path: '/loading',
		name: 'Loading',
		component: RouterLoading,
	},
];

const App = () => {
	// eslint-disable-next-line no-unused-vars
	const [state, dispatch] = useContext(ReducerContext);
	const intl = useIntl();

	/* default systme color mode */
	const [darkMode, setDarkMode] = useState(useMediaQuery('(prefers-color-scheme: dark)'));

	const theme = useMemo(() => createMuiTheme(antTheme({ darkMode })), [darkMode]);

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
						<Route key={index.toString()} path={`/${intl.locale}${page.path}`} component={page.component} />
					))}
					<Redirect to={`/${intl.locale}${pages[0].path}`} />
				</Switch>
			</div>
		</ThemeProvider>
	);
};

export default hot(App);
