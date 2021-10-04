import { Dispatch } from 'redux';
// import { ThunkAction } from 'redux-thunk';
import api from 'services/api';
import {
  IFilterTodosAction,
  ISetTodoLoadErrorAction, ISetTodoLoadingAction, ISetTodosAction, ITodo, ITodoFilters,
} from 'types/todo';
import {
  FILTER_TODOS, SET_TODOS, SET_TODOS_LOADING, SET_TODOS_LOAD_ERROR,
} from './todos.types';

export const setTodoLoading = (data: boolean): ISetTodoLoadingAction => ({
  type: SET_TODOS_LOADING,
  data,
});

export const setTodoLoadError = (data: boolean): ISetTodoLoadErrorAction => ({
  type: SET_TODOS_LOAD_ERROR,
  data,
});

export const setTodos = (data: ITodo[]): ISetTodosAction => ({
  type: SET_TODOS,
  data,
});

export const filterTodos = (filters: ITodoFilters): IFilterTodosAction => ({
  type: FILTER_TODOS,
  data: filters,
});

const fetchTodos = () => (dispatch: Dispatch) => {
  dispatch(setTodoLoading(true));

  return api.getTodos()
    .then(({ data }) => {
      dispatch(setTodos(data));
      dispatch(setTodoLoading(false));
    })
    .catch(() => {
      dispatch(setTodoLoading(false));
      dispatch(setTodoLoadError(true));
    });
};

export { fetchTodos };
