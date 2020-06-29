import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppContainer from 'home/AppContainer';

const Home = () => (
    <AppContainer title="Home" page="/" />
);

ReactDOM.render(<Home />, document.getElementById('entry'));
