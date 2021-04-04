import * as React from 'react';
import {
  EmitEvents,
  AccountStore,
  emitter
} from 'app/SharedGlobals';

interface AccountContainerProps {
  children: React.ReactNode;
}

const AccountContainer : React.FC<AccountContainerProps> = (
  props: AccountContainerProps
) => {
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);

  React.useEffect(() => {
    emitter.on(EmitEvents.AccountStateChanged, forceUpdate);
  });

  const element = React.cloneElement(props.children, {
    isLoggedIn: AccountStore.getState().isLoggedIn
  });
  return element;
}

export default AccountContainer;
