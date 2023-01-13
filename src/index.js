import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';

// redux store

import store from './redux/store';
import { Provider } from 'react-redux';

<script src="https://kit.fontawesome.com/21304f3376.js" crossorigin="anonymous"></script>



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

