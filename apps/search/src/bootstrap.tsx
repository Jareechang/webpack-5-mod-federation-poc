import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SearchResults from './SearchResults';

function mount(element) {
  if (element) {
    ReactDOM.render(
      <SearchResults />,
      element
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  mount(document.querySelector('#_entry-search-results'));
}

export {mount};
