import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Nav from './Nav';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { AccountContainer } from 'account/shared';

const generateClassName = createGenerateClassName({
  productionPrefix: 'common-nav',
});

function mount(element) {
  if (element) {
    ReactDOM.render(
      <StylesProvider generateClassName={generateClassName}>
        <AccountContainer>
          <Nav />
        </AccountContainer>
      </StylesProvider>,
      element
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  mount(document.querySelector('#_entry-common'));
}

export {mount};
