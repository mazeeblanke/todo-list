import { combineReducers } from 'redux';
import todoReducer from 'store/todos/todos.slice';

const rootReducer = combineReducers({
  todos: todoReducer,
});

export default rootReducer;
