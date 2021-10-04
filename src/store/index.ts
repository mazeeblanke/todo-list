import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'store/rootReducer';

// INITAL STATE OF STORE
const INITIAL_STATE = {};

export default function initStore(initialState = INITIAL_STATE) {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(reduxThunk, reduxPromise)),
  );
}
