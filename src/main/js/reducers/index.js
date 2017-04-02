import { combineReducers } from 'redux';
import {authReducer, errorsReducer} from './reducers';
import composer from './composer';
import articles from './articles';

/* Combine the application's reducers */
const reducer = combineReducers(Object.assign({}, {
  auth: authReducer,
  errors: errorsReducer,
  composer,
  articles
}));

export default reducer;
