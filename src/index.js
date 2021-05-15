import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import generateStore from './reducers/rootReducer';
import './index.css';

const store = generateStore(); 

let WithStore = () => <Provider store = {store} ><App /></Provider>
const WithStrictMode = () => <React.StrictMode><WithStore/></React.StrictMode>


ReactDOM.render(<WithStrictMode />, document.getElementById('root'));

