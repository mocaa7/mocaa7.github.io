import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <App a={2} b={3} message="This is the message"/>,
    document.getElementById('root')
);

serviceWorker.unregister();