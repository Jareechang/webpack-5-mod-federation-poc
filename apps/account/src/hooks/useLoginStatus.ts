import * as React from 'react';

import {
  AccountStore,
  emitter
} from 'app/SharedGlobals';
import {
  ACCOUNT_LOGIN_STATUS_CHANGED
} from '../constants';

interface Options {
  // Notify state changes to all other apps 
  notifyChange: boolean;
}

/*
 *
 * Custom hook which determines the login status of the account
 *
 * It includes ability to notify other apps regarding status changes via the option
 *
 * Example:
 * ```ts
 *
 * // No state emitted to other apps
 * const [isLoggedIn, setIsLoggedIn] = useLoginStatus();
 *
 * // Emitted changes to other apps
 * const [isLoggedIn, setIsLoggedIn] = useLoginStatus({
 *    notifyChanges: true
 * });
 *
 * ```
 *
 * **/
const useLoginStatus = (
  options: Options = { notifyChanges: false }
) => {
  const [isLoggedIn, _setIsLoggedIn] = React.useState<boolean>(false);

  const setIsLoggedIn = (v) => {
    _setIsLoggedIn(v);
    AccountStore.setIsLoggedIn(v);
    if (options.notifyChanges) {
      emitter.emit(
        ACCOUNT_LOGIN_STATUS_CHANGED,
        {
          isLoggedIn: v
        }
      );
    }
  }

  return [
    isLoggedIn,
    setIsLoggedIn
  ];
}

export default useLoginStatus;
