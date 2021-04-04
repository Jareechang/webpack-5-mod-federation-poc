import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
const generateClassName = createGenerateClassName({
  productionPrefix: 'home',
});

function mount(element) {
  if (element) {
    ReactDOM.render(
      <StylesProvider generateClassName={generateClassName}>
        <App />
      </StylesProvider>,
      element
    );
  }
}

mount(document.querySelector('#root'));

