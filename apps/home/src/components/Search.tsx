import * as React from 'react';

import {mount} from 'search/SearchEntry';

const Search = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    mount(ref.current);
  }, [ref]);
  return <div ref={ref} />;
}

export default Search;
