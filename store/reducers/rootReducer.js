import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import clockReducer from './clockReducer';

const rootReducer = combineReducers({
    counterReducer: counterReducer,
    clockReducer: clockReducer,
});

export default rootReducer;
