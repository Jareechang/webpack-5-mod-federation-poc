import * as React from 'react';
import {
    Router
} from "react-router-dom";

import {
  getHistory
} from 'app/SharedGlobals';

import Nav from './components/Nav';
import * as Routes from './Routes';

interface AppProps {
    children: React.ReactNode;
}

const history = getHistory();

const App : React.FC<AppProps> = (
  props: AppProps
) => {
  const { children } = props;
  return (
    <Router history={history}>
      <div id="AppContainer">
        <Nav />
        <Routes.Index />
      </div>
    </Router>
  );
};


export default App;
