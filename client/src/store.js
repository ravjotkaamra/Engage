import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers/reducers';
import { getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';

// const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

// Create store with reducers and initial state
// const initialState = {};
// const store = createStore(rootReducer, composeWithDevTools());
const initialState = {};

const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export default store;
