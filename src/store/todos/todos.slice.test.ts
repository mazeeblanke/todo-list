import reducer, { INITIAL_STATE } from 'store/todos/todos.slice';
import { ITodoFilters, ITodoRootState } from 'types/todo';
import todos from 'utils/mocks/todos';
import transformArray from 'utils/transformArray';
import {
  filterTodos, setTodoLoadError, setTodoLoading, setTodos,
} from 'store/todos/todos.actions';
import { default as filter } from 'utils/filterTodos';

describe('TodoReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('sets todo loading state', () => {
    expect(reducer(INITIAL_STATE, setTodoLoading(true)))
      .toEqual({ ...INITIAL_STATE, isFetchingTodos: true });
    expect(reducer(INITIAL_STATE, setTodoLoading(false)))
      .toEqual({ ...INITIAL_STATE, isFetchingTodos: false });
  });

  it('sets todo loading error state', () => {
    expect(reducer(INITIAL_STATE, setTodoLoadError(true)))
      .toEqual({ ...INITIAL_STATE, loadError: true });
    expect(reducer(INITIAL_STATE, setTodoLoadError(false)))
      .toEqual({ ...INITIAL_STATE, loadError: false });
  });

  it('sets todos', () => {
    expect(reducer(INITIAL_STATE, setTodos(todos)))
      .toEqual({ ...INITIAL_STATE, ...transformArray(todos), filtered: transformArray(todos) });
  });

  it('filters todos', () => {
    let filters: ITodoFilters = { search: '', completed: 'no' };
    const state: ITodoRootState = {
      ...INITIAL_STATE,
      ...transformArray(todos),
      filtered: transformArray(todos),
    };
    expect(reducer(state, filterTodos(filters)))
      .toEqual({
        ...INITIAL_STATE,
        ...transformArray(todos),
        filtered: transformArray(filter(todos, filters)),
      });

    filters = { search: 'ut', completed: 'yes' };

    expect(reducer(state, filterTodos(filters)))
      .toEqual({
        ...INITIAL_STATE,
        ...transformArray(todos),
        filtered: transformArray(filter(todos, filters)),
      });
  });
});
