import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import TaskManager from './TaskManager';
import './index.css';
import { setIsLight, setTheme } from './taskSlice'; 
const savedTheme = localStorage.getItem('theme');
if (savedTheme !== null) {
  store.dispatch(setIsLight(savedTheme === 'true'));
  store.dispatch(setTheme(savedTheme === 'true'));
}

ReactDOM.render(
  <Provider store={store}>
    <TaskManager />
  </Provider>,
  document.getElementById('root')
);

