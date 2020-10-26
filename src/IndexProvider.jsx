import React, { useEffect, createContext, useReducer } from 'react';
import { IntlProvider } from 'react-intl';

import { changeLang } from './app/appAction';

// 將 combineReducer 後的 Reducer import
import reducers from './indexReducerRoot';

// 建立一個 context component ，並匯出給子 component 使用
const ReducerContext = createContext();
export { ReducerContext };

/* 
 呼叫 combineReducer 後的 reducers ，
 利用如果沒傳任何 action 就回傳目前的 state 來取得初始資料
*/
const initState = reducers();

const IndexProvider = ({ children }) => {
	// 使用 useReducer 將創建後的 state 及 dispatch 放進 reducer
	const reducer = useReducer(reducers, initState);
	const [state, dispatch] = reducer;
	const { language } = state.app;
	useEffect(() => {
		/* 將瀏覽器預設語系帶入 */
		let lang = navigator.languages ? navigator.languages[0] : navigator.language || navigator.userLanguage;
		lang = lang.toLowerCase();
		changeLang(lang, dispatch);
	}, []);
	// console.info('language change', language);
	if (language && language.messages) {
		return (
			<ReducerContext.Provider value={reducer}>
				<IntlProvider locale={language.locale} messages={language.messages}>
					{children}
				</IntlProvider>
			</ReducerContext.Provider>
		);
	}
	return false;
};

export default IndexProvider;
