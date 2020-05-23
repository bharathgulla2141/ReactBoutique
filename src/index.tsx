import React from 'react';
import { setupConfig } from '@ionic/react'
import ReactDOM from 'react-dom';
import {Application} from './context/AppContext';
import * as serviceWorker from './serviceWorker';
import AppListener from "./eventListeners/AppListeners";

setupConfig({
    hardwareBackButton : false
});

AppListener();

ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
