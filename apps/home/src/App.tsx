import * as React from 'react';
import {
    Router
} from "react-router-dom";

import {
  getHistory
} from 'app/SharedGlobals';

import Search from './components/Search';

import * as Routes from './Routes';

interface Props {
    children: React.ReactNode;
}

const history = getHistory();

const App = (props: Props) => {
  const { children } = props;
  return (
    <Router history={history}>
      <div id="AppContainer">
        {/* Nav */}
        <Search />
        {/* Page Body */}
        <Routes.Index />
      </div>
    </Router>
  );
};


export default App;
