import * as React from 'react';

import { createBrowserHistory } from 'history';

const globalHistoryKey = '__app/SharedGlobal/__global-shared-history__';

const createHistory = () => {
  if (window[globalHistoryKey]) {
    return window[globalHistoryKey];
  }
  if (window) {
    window[globalHistoryKey] = createBrowserHistory();
  }
  return window[globalHistoryKey];
}

export const getHistory = () => {
  return createHistory();
}
