import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as home from './home/reducer';
import * as production from './production/reducer';
import * as record from './record/reducer'
import thunk from 'redux-thunk';

let store = createStore(
  combineReducers({...home, ...production,...record}),
  applyMiddleware(thunk)
);

export default store;