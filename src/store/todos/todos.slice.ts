import {
  IRootState,
  ITodo,
  ITodoRootState,
} from 'types/todo';
import filterTodos from 'utils/filterTodos';
import transformArray from 'utils/transformArray';
import {
  FILTER_TODOS, SET_TODOS, SET_TODOS_LOADING, SET_TODOS_LOAD_ERROR,
} from 'store/todos/todos.types';

export const INITIAL_STATE: ITodoRootState = {
  byIds: [],
  all: {},
  filtered: {
    byIds: [],
    all: {},
  },
  loadError: false,
  isFetchingTodos: true,
};

const getTodos = (state: IRootState): ITodo[] => (
  state.todos.byIds.map((i: number) => state.todos.all[i])
);

export { getTodos };

export const getFilteredTodos = (state: IRootState): ITodo[] => (
  state.todos.filtered.byIds.map((i: number) => state.todos.filtered.all[i])
);

export default (state = INITIAL_STATE, payload: any) => {
  const { type, data } = payload;
  switch (type) {
    case SET_TODOS: {
      const todos = transformArray(data);
      return {
        ...state,
        ...todos,
        filtered: todos,
      };
    }
    case SET_TODOS_LOADING: {
      return {
        ...state,
        isFetchingTodos: data,
      };
    }
    case SET_TODOS_LOAD_ERROR: {
      return {
        ...state,
        loadError: data,
      };
    }
    case FILTER_TODOS: {
      const todos = filterTodos(getTodos({ todos: state }), data);
      const filtered = transformArray(todos);
      return {
        ...state,
        filtered,
      };
    }
    default:
      return state;
  }
};
