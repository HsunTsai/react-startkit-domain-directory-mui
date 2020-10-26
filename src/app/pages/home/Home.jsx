import React, { useContext, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button } from 'antd';
import classNames from 'classnames';
import { ReducerContext } from '../../../IndexProvider';
import { countUp, countDown } from './homeAction';

import './home.scss';

const Home = () => {
	const [state, dispatch] = useContext(ReducerContext);
	const { count } = state.home;
	const { formatMessage } = useIntl();

	const [active, setActive] = useState(false);

	return (
		<div className="home">
			{/* Header */}
			<div className={classNames('home-box', 'home-box__header')}>
				<div className={classNames('home-box__header-title', { 'home-box__header-title--active': active })}>
					Home Page
				</div>
				<Button className="home-box__header-btn" type="primary" size="small" onClick={() => setActive(!active)}>
					{`Home Title ${active ? 'inActive' : 'Active'}`}
				</Button>
			</div>

			{/* Intl - two types formater for demo */}
			<div className={classNames('home-box', 'home-box__intl')}>
				<div className="home-box__intl-title">Intl Demo</div>
				<div>{`Type 1 [ <FormattedMessage id='xxx' values={{ xxx: 'xxx' }} /> ]`}</div>
				<FormattedMessage id="superHello" values={{ someoneName: 'Hsun.Tsai' }} />
				<div>{`Type 2 [ useIntl().formatMessage({ id='xxx' }, { xxx= 'xxx' }) ]`}</div>
				{formatMessage({ id: 'superHello' }, { someoneName: 'Hsun.Tsai' })}
			</div>

			<div className={classNames('home-box', 'home-box__redux')}>
				<div className="home-box__redux-title">{`Now Count ==> ${count}`}</div>
				<div>
					<Button style={{ marginRight: 8 }} onClick={() => countUp(dispatch, count)}>
						Count Up
					</Button>
					<Button onClick={() => countDown(dispatch, count)}>Count Down</Button>
				</div>
			</div>
		</div>
	);
};

export default Home;
