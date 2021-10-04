import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from 'components/atoms/Header';
import Alert from 'components/atoms/Alert';
import TodoForm from 'components/organisms/TodoForm';
import TodoList from 'components/organisms/TodoList';
import { fetchTodos } from 'store/todos/todos.actions';
import 'scss/app.scss';
import { getFilteredTodos } from 'store/todos/todos.slice';
import { IRootState, ITodoList } from 'types/todo';
import { LOADING_TEXT, LOAD_ERROR, NO_RESULT } from 'utils/constants';

interface IHomePageDispatchProps {
  fetchTodos: () => {},
  isFetchingTodos: boolean,
  loadError: boolean
}

type IHomePageInterface = ITodoList & IHomePageDispatchProps;

function HomePage(props: IHomePageInterface) {
  const { todos, isFetchingTodos, loadError } = props;
  useEffect(() => {
    props.fetchTodos();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        <TodoForm />
        {todos.length ? <TodoList todos={todos} /> : null}
        { isFetchingTodos ? <p className="f-body">{LOADING_TEXT}</p> : ''}
        {!todos.length && !isFetchingTodos && !loadError ? (
          <Alert>{NO_RESULT}</Alert>
        ) : null}
        {!todos.length && !isFetchingTodos && loadError ? (
          <Alert>{LOAD_ERROR}</Alert>
        ) : null}
      </main>
    </>
  );
}

const mapStateToProps = (state: IRootState) => ({
  todos: getFilteredTodos(state),
  loadError: state.todos.loadError,
  isFetchingTodos: state.todos.isFetchingTodos,
});

export default connect(
  mapStateToProps,
  {
    fetchTodos,
  },
)(HomePage);
