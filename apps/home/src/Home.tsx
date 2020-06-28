import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppContainer from 'home/AppContainer';

const Home = () => (
    <AppContainer title="Home">
        <div id="home">
            <h1>This is the home app </h1>
        </div>
    </AppContainer>
);

ReactDOM.render(<Home />, document.getElementById('entry'));
