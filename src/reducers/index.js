import { combineReducers } from 'redux';
import MisLibrosReducer from './MisLibrosReducer';
import AuthReducer from './AuthReducer';
import ChangeReducer from './ChangeReducer';

export default combineReducers({
	MisLibrosReducer,
	AuthReducer,
	ChangeReducer
})