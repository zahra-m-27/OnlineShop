import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './Assets/css/bootstrap.min.css';
import './Assets/css/bootstrap-rtl.min.css';
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import foodBuilderReducer from "./store/Reducers/food-builder-reducer";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import authReducer from "./store/Reducers/auth-reducer";

const rootReducer = combineReducers({
    foodBuilder: foodBuilderReducer,
    auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
))

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <App />
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
