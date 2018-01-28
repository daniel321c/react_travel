import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { App } from './App';
import { combineReducers } from 'redux';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import { authentication }from './login/Login.reducer'
import { registration } from './register/Register.reducer'

const loggerMiddleware = createLogger();

export const store = createStore(
    combineReducers({
        authentication,
        registration
    }),
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);