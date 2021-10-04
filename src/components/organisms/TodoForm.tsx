import React, {
  FC, useState, ChangeEvent, useEffect,
} from 'react';
import { connect } from 'react-redux';
import { filterTodos } from 'store/todos/todos.actions';
import { ITodoFilters, ITodoFormDispatchProps } from 'types/todo';

type ITodoFormProps = ITodoFormDispatchProps;

const TodoForm: FC<ITodoFormProps> = (props) => {
  const [filters, setFilters] = useState<ITodoFilters>({
    search: '',
    completed: '',
  });

  useEffect(() => {
    props.filterTodos(filters);
  }, [filters]);

  const handleNewInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFilters({
      ...filters,
      search: e.target.value,
    });
  };

  const handleNewSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setFilters({
      ...filters,
      completed: e.target.value,
    });
  };

  return (
    <div className="o-todoform">
      <form>
        <div className="o-todoform__group">
          <label htmlFor="search">Search</label>
          <input
            onChange={handleNewInputChange}
            placeholder="Keyword..."
            className="o-todoform__input"
            id="search"
            type="text"
            autoComplete="false"
            value={filters.search}
          />
        </div>
        <div className="o-todoform__group">
          <label htmlFor="completed">Completed</label>
          <select defaultValue="" onChange={handleNewSelectChange} className="o-todoform__select" id="completed">
            <option value="">-</option>
            <option value="yes">yes</option>
            <option value="no">no</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default connect(
  null,
  {
    filterTodos,
  },
)(TodoForm);
