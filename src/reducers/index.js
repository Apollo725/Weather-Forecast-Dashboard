import { combineReducers } from 'redux';
import authReducer from './authReducer';
import dashboardReducer from './dashboardReducer';

const rootReducer = combineReducers({
  authReducer,
  dashboardReducer,
});

export default rootReducer;
