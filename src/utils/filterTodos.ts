import { ITodo, ITodoFilters } from 'types/todo/index';

export default (todos: ITodo[], filters: ITodoFilters) => {
  const { search, completed } = filters;

  return todos
    .filter((todo: ITodo) => {
      if (search) {
        return (todo.title.includes(search));
      }
      return todo;
    })
    .filter((todo: ITodo) => {
      if (completed === 'yes') {
        return todo.completed === (completed === 'yes');
      } if (completed === 'no') {
        return todo.completed !== (completed === 'no');
      }
      return todo;
    });
};
