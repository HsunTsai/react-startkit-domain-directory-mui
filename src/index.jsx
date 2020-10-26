import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './scss/index.scss';

import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import CustomProvider from './IndexProvider';
import App from './app/App';

const render = Component => {
	ReactDOM.render(
		<CustomProvider>
			<AppContainer>
				<Component />
			</AppContainer>
		</CustomProvider>,
		document.getElementById('app')
	);
};

render(App);
if (module.hot) {
	module.hot.accept('./app/App', () => {
		render(App);
	});
}
