import React, { FC } from 'react';
import { ITodo } from 'types/todo';

interface ITodoListProps {
  todos: ITodo[]
}

const TodoList: FC<ITodoListProps> = ({ todos }) => (
  <div>
    <table className="o-table">
      <thead>
        <tr>
          <th colSpan={1}>#</th>
          <th colSpan={4}>Title</th>
          <th colSpan={1}>Completed</th>
        </tr>
      </thead>
      <tbody>
        {
          todos.map(({ completed, title, id }, index) => (
            <tr key={id}>
              <td colSpan={1}>{index + 1}</td>
              <td colSpan={4}>{title}</td>
              <td colSpan={1}>{completed ? 'yes' : 'no'}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

export default TodoList;
