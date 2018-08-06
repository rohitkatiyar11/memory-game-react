import React from 'react';
import ReactDOM from 'react-dom';
import GameApp from './components/GameApp';
import { Provider } from 'react-redux'
import configureStore from './store'
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( <Provider store={configureStore()}>
    <GameApp />
  </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
