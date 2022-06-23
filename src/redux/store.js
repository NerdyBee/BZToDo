import {configureStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import taskReducer from './reducers';

const rootReducer = combineReducers({taskReducer});

export const Store = configureStore(rootReducer, applyMiddleware(thunk));
