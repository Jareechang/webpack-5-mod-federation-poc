import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppContainer from 'home/AppContainer';

const Search = () => (
    <AppContainer title="Search" page="search" />
);

ReactDOM.render(<Search />, document.getElementById('entry'));
