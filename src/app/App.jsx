import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
/* You can cache page when page cahnge by import CacheRoute & CacheSwitch */
// import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

import services from './config/services';
import Header from './common/components/Header';

import HomeComponent from './pages/home/Home';
import AboutComponent from './pages/about/About';
import TopicsComponent from './pages/topic/Topics';

const App = () => {
	const pages = [
		{ path: '/home', name: 'Home', component: HomeComponent },
		{ path: '/about', name: 'About', component: AboutComponent },
		{ path: '/topic', name: 'Topic', component: TopicsComponent },
	];
	return (
		<Router basename={services.getContextRoot}>
			<div className="app">
				<Header pages={pages} />
				<Switch>
					{pages.map((page, index) => (
						<Route
							key={index.toString()}
							exact
							path={page.path}
							component={page.component}
						/>
					))}
					<Redirect to={pages[0].path} />
				</Switch>
			</div>
		</Router>
	);
};

export default App;
