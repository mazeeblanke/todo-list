import React from 'react';
import Home from 'views/Home/HomePage/HomePage';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import {
  render, fireEvent, screen, waitForElementToBeRemoved,
} from 'utils/test-utils';
import todos from 'utils/mocks/todos';
import { API_HOST, LOADING_TEXT, NO_RESULT, TODOS_PATH } from 'utils/constants';

// We use msw to intercept the network request during the test,
// and return the response 'John Smith' after 150ms
// when receiving a get request to the `/api/user` endpoint
const handlers = [
  rest.get(`${API_HOST+TODOS_PATH}`, (req, res, ctx) => res(ctx.json(todos), ctx.delay(20))),
];

const server = setupServer(...handlers);

let searchInput: HTMLElement;
let completedSelect: HTMLElement;

// Enable API mocking before tests.
beforeAll(() => {
  server.listen();
});

beforeEach(() => {
  render(<Home />);
  searchInput = screen.getByLabelText('Search');
  completedSelect = screen.getByLabelText('Completed');
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

it('shows loading text and shows no todo initially', async () => {
  expect(screen.getByText(new RegExp(LOADING_TEXT, 'i'))).toBeInTheDocument();
});

it('renders todo list after loading', async () => {
  await waitForElementToBeRemoved(() => screen.queryByText(new RegExp(LOADING_TEXT, 'i')));

  expect(await screen.findByText(new RegExp(todos[0].title, 'i'))).toBeInTheDocument();
  expect(await screen.findByText(new RegExp(todos[1].title, 'i'))).toBeInTheDocument();
});

it('shows no result on wrong search', async () => {
  await waitForElementToBeRemoved(() => screen.queryByText(new RegExp(LOADING_TEXT, 'i')));

  fireEvent.change(searchInput, { target: { value: '23' } });
  expect(await screen.findByText(new RegExp(NO_RESULT, 'i'))).toBeInTheDocument();
  expect(await screen.queryByText(new RegExp(todos[0].title, 'i'))).not.toBeInTheDocument();
  expect(await screen.queryByText(new RegExp(todos[1].title, 'i'))).not.toBeInTheDocument();
});

it('searches for first todo item correctly on search', async () => {
  await waitForElementToBeRemoved(() => screen.queryByText(new RegExp(LOADING_TEXT, 'i')));

  fireEvent.change(searchInput, { target: { value: todos[0].title } });
  expect(await screen.queryByText(new RegExp(NO_RESULT, 'i'))).not.toBeInTheDocument();
  expect(await screen.queryByText(new RegExp(todos[0].title, 'i'))).toBeInTheDocument();
  expect(await screen.queryByText(new RegExp(todos[1].title, 'i'))).not.toBeInTheDocument();
});

it('searches correctly when completed is set to "yes" ', async () => {
  await waitForElementToBeRemoved(() => screen.queryByText(new RegExp(LOADING_TEXT, 'i')));

  fireEvent.change(completedSelect, { target: { value: 'yes' } });
  expect(await screen.queryByText(new RegExp(NO_RESULT, 'i'))).toBeInTheDocument();
  expect(await screen.queryByText(new RegExp(todos[0].title, 'i'))).not.toBeInTheDocument();
  expect(await screen.queryByText(new RegExp(todos[1].title, 'i'))).not.toBeInTheDocument();
});

it('searches correctly when completed is set to "no" ', async () => {
  await waitForElementToBeRemoved(() => screen.queryByText(new RegExp(LOADING_TEXT, 'i')));

  fireEvent.change(completedSelect, { target: { value: 'no' } });
  expect(await screen.queryByText(new RegExp(NO_RESULT, 'i'))).not.toBeInTheDocument();
  expect(await screen.queryByText(new RegExp(todos[0].title, 'i'))).toBeInTheDocument();
  expect(await screen.queryByText(new RegExp(todos[1].title, 'i'))).toBeInTheDocument();
});

it('filters todos correctly when both filters are used', async () => {
  await waitForElementToBeRemoved(() => screen.queryByText(new RegExp(LOADING_TEXT, 'i')));

  fireEvent.change(completedSelect, { target: { value: 'no' } });
  fireEvent.change(searchInput, { target: { value: todos[1].title.split('')[0] } });

  expect(await screen.queryByText(new RegExp(NO_RESULT, 'i'))).not.toBeInTheDocument();
  expect(await screen.queryByText(new RegExp(todos[0].title, 'i'))).not.toBeInTheDocument();
  expect(await screen.queryByText(new RegExp(todos[1].title, 'i'))).toBeInTheDocument();
});
