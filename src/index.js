import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import './index.css';
import GameApp from './components/GameApp';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
    <Provider store={configureStore()}>
        <GameApp />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();