import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Search from './Search';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { AccountContainer } from 'account/shared';
const generateClassName = createGenerateClassName({
  productionPrefix: 'search',
});

function mount(element) {
  if (element) {
    ReactDOM.render(
      <StylesProvider generateClassName={generateClassName}>
        <AccountContainer>
          <Search />
        </AccountContainer>
      </StylesProvider>,
      element
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  mount(document.querySelector('#_entry-search-bar'));
}

export {mount};
