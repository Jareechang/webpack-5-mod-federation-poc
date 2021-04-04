import * as React from 'react';

import {
  AccountStore,
  getHistory,
  EmitEvents,
  emitter,
  Loading
} from 'app/SharedGlobals';

import {
  Switch,
  Redirect,
  Route,
  Router,
  Link
} from 'react-router-dom';

import { createMemoryHistory } from 'history';
import { AccountContainer } from './components';

const ProfilePage = React.lazy(() => import('./pages/Profile'));
const LoginPage = React.lazy(() => import('./pages/Login'));

const history = {
  global: getHistory(),
  local: createMemoryHistory()
}

export default function App({ isLoggedIn }) {
  React.useEffect(() => {
    const globalPath = history.global.location.pathname;
    const localPath = history.local.location.pathname;
    history.local.listen((location) => {
      const { pathname, search } = location;
      history.global.push({
        ...location
      });
    });
    console.log(localPath, globalPath);
    // Synchornize local and global history
    if (globalPath !== localPath) {
      history.local.push({
        pathname: globalPath
      });
    }
  }, [history.local]);

  const navigate = (path) => {
      history.local.push(path);
  }

  return (
      <Router history={history.local}>
        <React.Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/account/profile" exact={true}>
              {!isLoggedIn && <Redirect to="/account/login" />}
              <ProfilePage />
            </Route>
            <Route path="/account/login" exact={true}>
              <LoginPage />
            </Route>
          </Switch>
        </React.Suspense>
      </Router>
  );
}
