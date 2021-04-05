import * as React from 'react';

import {mount} from 'common/Nav';

const Nav = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    mount(ref.current);
  }, [ref]);
  return <div ref={ref} />;
}

export default Nav;
