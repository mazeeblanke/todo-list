import { ITodo } from 'types/todo';
import filterTodos from 'utils/filterTodos';
import todos from 'utils/mocks/todos';

describe('filterTodos', () => {
  it('filters by title', () => {
    const filteredTodos: ITodo[] = filterTodos(todos, { search: todos[0].title, completed: '' });
    expect(filteredTodos.length).toEqual(1);
  });
  it('filters by completed', () => {
    const filteredTodos: ITodo[] = filterTodos(todos, { search: '', completed: 'yes' });
    expect(filteredTodos.length).toEqual(0);
  });
  it('filters by completed and title', () => {
    const filteredTodos: ITodo[] = filterTodos(todos, { search: 'ut', completed: 'no' });
    expect(filteredTodos.length).toEqual(2);
  });
});
