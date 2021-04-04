import * as React from 'react';

export const AccountLoginContext = React.createContext({
  loggedIn: false,
  setLoggedIn: () => {}
});
