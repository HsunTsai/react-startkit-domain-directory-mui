import React, { useContext, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';
import classNames from 'classnames';
import { ReducerContext } from '../../ReduxIntlProvider';
import { countUp, countDown } from './homeAction';

const Home = () => {
	const [state, dispatch] = useContext(ReducerContext);
	const { count } = state.home;

	const [active, setActive] = useState(false);

	return (
		<div className="home">
			<div
				className={classNames('home__title', {
					'home__title--active': active,
				})}
			>
				Home Page
			</div>
			<FormattedMessage id="superHello" values={{ someoneName: 'Hsun.Tsai' }} />
			<Button className="home__btn" type="primary" onClick={() => setActive(!active)}>
				{`Home Title ${active ? 'inActive' : 'Active'}`}
			</Button>

			<br />
			<div>{`Now Count ==> ${count}`}</div>
			<div>
				<Button onClick={() => countUp(dispatch, count)}>Count Up</Button>
				<Button onClick={() => countDown(dispatch, count)}>Count Down</Button>
			</div>
		</div>
	);
};

export default Home;
