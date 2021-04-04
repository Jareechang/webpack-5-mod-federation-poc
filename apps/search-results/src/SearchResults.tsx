import * as React from 'react';

import {
  Box,
  Grid,
  Typography
} from '@material-ui/core';

import { Container } from 'app/SharedGlobals';

interface SearchResultsProps {}

const SearchResults: React.FC<SearchResultsProps> = () => {
  const items = [
    {
      key: 'cat1',
      src: "https://cdn2.thecatapi.com/images/8KNzClLX4.jpg"
    },
    {
      key: 'cat2',
      src: "https://cdn2.thecatapi.com/images/8KNzClLX4.jpg"
    },
    {
      key: 'cat3',
      src: "https://cdn2.thecatapi.com/images/8KNzClLX4.jpg"
    },
    {
      key: 'cat4',
      src: "https://cdn2.thecatapi.com/images/8KNzClLX4.jpg"
    }
  ];
  return (
    <>
      <Container>
        <Grid container spacing={4}>
          {
            items.map((item) => {
              return (
                <Grid key={item.key} item md={3}>
                  <img
                    src={item.src}
                    width="100%"
                  />
                </Grid>
              )
            })
          }
        </Grid>
      </Container>
    </>
  );
}

export default SearchResults;
