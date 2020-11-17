import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import singleProductReducer from './singleProductReducer';

const rootReducer = combineReducers({
    loginReducer: loginReducer,
    registerReducer: registerReducer,
    singleProductReducer: singleProductReducer,
});

export default rootReducer;
