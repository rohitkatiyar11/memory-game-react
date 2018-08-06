import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GameApp from './components/GameApp';
import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(
        <GameApp />,
    document.getElementById('root')
);
registerServiceWorker();