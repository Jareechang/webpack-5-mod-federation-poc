import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import {AccountContainer} from './components';

const generateClassName = createGenerateClassName({
  productionPrefix: 'account'
});

import App from './App';

function mount(element) {
  if (element) {
    ReactDOM.render(
      <StylesProvider generateClassName={generateClassName}>
        <AccountContainer>
          <App />
        </AccountContainer>
      </StylesProvider>,
      element
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  mount(document.querySelector('#_entry-account'));
}

export {mount};
