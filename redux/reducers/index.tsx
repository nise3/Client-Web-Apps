import {combineReducers} from 'redux';
import Settings from './Setting';
import Common from './CommonReducer';
import Auth from './Auth';

const rootReducer = combineReducers({
  settings: Settings,
  auth: Auth,
  common: Common,
});

export default rootReducer;
