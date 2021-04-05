import * as React from 'react';

import {
  Box,
  Grid,
  Typography
} from '@material-ui/core';

import { Container } from 'app/SharedGlobals';

import { items } from './data';

interface SearchResultsProps {}

const SearchResults: React.FC<SearchResultsProps> = () => {
  return (
    <>
      <Container>
        <Box my={2}>
          <Typography variant="h6">
            Search
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {
            items.map((item) => {
              return (
                <Grid key={item.key} item md={4}>
                  <img
                    src={item.src}
                    width="250px"
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
