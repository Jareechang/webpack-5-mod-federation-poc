import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppContainer from 'home/AppContainer';

const Search = () => (
    <AppContainer title="Search">
        <div id="search">
            <h1>This is the search app</h1>
        </div>
    </AppContainer>
);

ReactDOM.render(<Search />, document.getElementById('entry'));
