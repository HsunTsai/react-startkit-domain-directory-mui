/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import services from './app/config/services';
import Loading from './app/common/loading/Loading';
import { changeLang, supportLanguages } from './app/utils/languageTools';

// 將 combineReducer 後的 Reducer import
import rootReducer from './combineReducer';

const store = createStore(rootReducer /* preloadedState, */, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const IndexProvider = ({ match, history, children }) => {
	const [i18n, setI18n] = useState();
	const {
		params: { locale },
	} = match;

	useEffect(() => {
		/* 檢查 語系最常不會超過9字元 => https://github.com/ladjs/i18n-locales
		 * 檢查 本系統是否支援該語系 */
		if (locale && locale.length < 9 && supportLanguages.some(({ value }) => value === locale)) {
			axios
				.get(`${services.getLocale}/${locale}.json`)
				.then(response => setI18n({ locale, messages: response.data }))
				/* 語系取得失敗時使用英文 */
				.catch(() => {
					axios.get(`${services.getLocale}/en.json`).then(response => setI18n({ locale: 'en', messages: response.data }));
				});
		} else {
			/* URL沒有語系 自動將語系帶上 */
			changeLang({ history });
		}
	}, [locale]);

	return i18n ? (
		<Provider store={store}>
			<IntlProvider locale={i18n.locale} messages={i18n.messages}>
				{children}
			</IntlProvider>
		</Provider>
	) : (
		<Loading />
	);
};

IndexProvider.propTypes = {
	match: PropTypes.objectOf(PropTypes.any).isRequired,
	history: PropTypes.objectOf(PropTypes.any).isRequired,
	children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IndexProvider;
