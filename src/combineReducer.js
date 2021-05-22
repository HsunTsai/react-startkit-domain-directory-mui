import { combineReducers } from 'redux';
import app from './app/appReducer';
import home from './app/pages/home/homeReducer';
// ex. import newReducer from './newReducer'

// 將要用的reducer都放入下方object
const rootReducer = combineReducers({
	app,
	home,
});

export default rootReducer;
