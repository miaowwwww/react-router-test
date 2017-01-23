import { combineReducers } from 'redux';
import myPage from './myPage';
import commont from './commont';
const reducers = combineReducers({
	myPage,
	commont
});

export default reducers;