export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ITodoList {
  todos: ITodo[]
}

export interface ITransformedTodo {
  byIds: number[],
  all: {
    [key: string]: ITodo
  },
}

export interface ITodoFilters {
  search: string;
  completed: string;
}

export interface ITodoFormDispatchProps {
  filterTodos: (filters: ITodoFilters) => void
}

export interface IFilterTodosAction {
  type: string,
  data: ITodoFilters
}

export interface ISetTodoLoadingAction {
  type: string,
  data: boolean
}

export interface ISetTodosAction {
  type: string,
  data: ITodo[]
}

export interface ISetTodoLoadErrorAction {
  type: string,
  data: boolean
}

export interface ITodoFormStateProps {
  todos: ITodo[]
}

export interface ITodoRootState {
  byIds: number[],
  all: {
    [key: string]: ITodo
  },
  filtered: ITransformedTodo,
  loadError: boolean,
  isFetchingTodos: boolean,
}

export interface IRootState {
  todos: ITodoRootState
}
