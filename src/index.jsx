/* eslint-disable react/jsx-props-no-spreading */
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './scss/index.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import services from './app/config/services';
import IndexProvider from './IndexProvider';
import App from './app/App';

const render = Component => {
	ReactDOM.render(
		<SnackbarProvider maxSnack={3}>
			<BrowserRouter basename={services.getContextRoot}>
				<Switch>
					<Route
						path="/:locale?" // ? => unnecessary
						render={props => (
							<IndexProvider {...props}>
								<Component />
							</IndexProvider>
						)}
					/>
				</Switch>
			</BrowserRouter>
		</SnackbarProvider>,
		document.getElementById('app')
	);
};

render(App);
if (module.hot) {
	module.hot.accept('./app/App', () => {
		render(App);
	});
}
