import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';

import store from './store';
import Main from './components/Main';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
