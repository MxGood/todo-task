import { combineReducers } from 'redux';

import todosReducer from '../todos';

const rootReducer = combineReducers({
  todosState: todosReducer
});

export default rootReducer;
