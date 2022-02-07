import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import sessionReducer from './session';
import locationReducer from './locations';
import reviewReducer from './reviews';

// redux devtool types are not used by redux defaut type package
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?: typeof compose
  }
}

const rootReducer = combineReducers({
  session: sessionReducer,
  location: locationReducer,
  review: reviewReducer
});

export type RootState = ReturnType<typeof rootReducer>

let enhancer: any;
if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState: RootState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
