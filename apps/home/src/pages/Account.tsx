import * as React from 'react';

import {mount} from 'account/Page';

import {
  AccountStore,
} from 'app/SharedGlobals';

const Account = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    mount(ref.current);
  }, [ref]);
  return <div ref={ref} />;
}

export default Account;
