import { ITransformedTodo } from 'types/todo';
import transformArray from 'utils/transformArray';
import todos from 'utils/mocks/todos';

describe('transformArray', () => {
  it('transforms the data using `id` when no key is specified', () => {
    const { all, byIds }: ITransformedTodo = transformArray(todos);
    expect(byIds.length).toBe(todos.length);
    expect(Object.keys(all).map((k) => +k).sort()).toEqual(byIds.sort());
    expect(all[byIds[0]].id).toEqual(byIds[0]);
  });

  it('transforms the data using specified key', () => {
    const { all, byIds }: ITransformedTodo = transformArray(todos, 'title');
    expect(byIds.length).toBe(todos.length);
    expect(Object.keys(all)).toEqual(byIds);
    expect(all[byIds[0]].title).toEqual(byIds[0]);
  });
});
