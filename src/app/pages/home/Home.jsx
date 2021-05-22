import React, { useState } from 'react';
import axios from 'axios';
import { FormattedMessage, useIntl } from 'react-intl';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import { SHOW_SNACK_BAR } from '../../appAction';
import { countUp, countDown } from './homeAction';
import services from '../../config/services';

import './home.scss';

const Home = () => {
	const dispatch = useDispatch();
	const { count } = useSelector(state => state.home);
	const { formatMessage } = useIntl();

	const [active, setActive] = useState(false);

	return (
		<div className="home">
			{/* Header */}
			<div className={classNames('home-box', 'home-box__header')}>
				<div className={classNames('home-box__header-title', { 'home-box__header-title--active': active })}>Home Page</div>
				<Button className="home-box__header-btn" type="primary" size="small" onClick={() => setActive(!active)}>
					{`Home Title ${active ? 'inActive' : 'Active'}`}
				</Button>
			</div>

			{/* Intl - two types formater for demo */}
			<div className="home-box">
				<div className="home-box-title">Intl Demo</div>
				<div>{`Type 1 [ <FormattedMessage id='xxx' values={{ xxx: 'xxx' }} /> ]`}</div>
				<FormattedMessage id="superHello" values={{ someoneName: 'Hsun.Tsai' }} />
				<div>{`Type 2 [ useIntl().formatMessage({ id='xxx' }, { xxx= 'xxx' }) ]`}</div>
				{formatMessage({ id: 'superHello' }, { someoneName: 'Hsun.Tsai' })}
			</div>

			<div className="home-box">
				<div className="home-box__title">{`Now Count ==> ${count}`}</div>
				<div>
					<Button
						style={{ marginRight: 8 }}
						onClick={() => {
							// enqueueSnackbar('0.0', { variant: 'success', autoHideDuration: 4000 });
							countUp(dispatch, count);
						}}
					>
						Count Up
					</Button>
					<Button onClick={() => countDown(dispatch, count)}>Count Down</Button>
				</div>
			</div>
			<div className="home-box">
				<div className="home-box__title">Show Notify with snackbar</div>
				<Button
					onClick={() =>
						dispatch({
							type: SHOW_SNACK_BAR,
							message: "I'm Message",
							// action: <div onClick={() => closeSnackbar('asd')}>qweqweqwe</div>,
						})
					}
				>
					Show Message
				</Button>
			</div>
			<div className="home-box">
				<div className="home-box__title">Fetch error (404)</div>
				<Button onClick={() => axios.get(services.apiTest).catch(error => dispatch({ type: SHOW_SNACK_BAR, error }))}>Fetch</Button>
			</div>
		</div>
	);
};

export default Home;
