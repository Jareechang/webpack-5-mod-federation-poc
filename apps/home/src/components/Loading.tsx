import * as React from 'react';
import {
  Box,
  Grid,
  CircularProgress
} from '@material-ui/core';

import Container from './Container';

interface LoadingProps {}
const Loading : React.FC<LoadingProps> = (
  props: LoadingProps
) => {
  return (
    <Container>
      <Grid container justify="center">
        <Box py={2}>
          <CircularProgress />
        </Box>
      </Grid>
    </Container>
  );
}

export default Loading;
