import * as React from 'react';

import {mount} from 'searchResults/Page';

const SearchResults = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    mount(ref.current);
  }, [ref]);
  return <div ref={ref} />;
}

export default SearchResults;
