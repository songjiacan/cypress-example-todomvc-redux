import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger, thunk)))
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export const StoreProvider = ({children}) => (<Provider store={store}>{children}</Provider>)

// expose store during tests
/* istanbul ignore else */
if (window.Cypress) {
  window.store = store
}
