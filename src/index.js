// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', { rootTag: document.getElementById('root') });

if (module.hot) {
    module.hot.accept('./App', () => {
        const NextApp = require('./App').default;
        AppRegistry.registerComponent('App', () => NextApp);
        AppRegistry.runApplication('App', { rootTag: document.getElementById('root') });;
    });
}