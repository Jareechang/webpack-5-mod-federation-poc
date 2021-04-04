import * as React from 'react';
import Container from '../components/Container';

import {
  Box,
  Grid,
  Typography
} from '@material-ui/core';

import cats from '../data/cats.json';

interface HomeProps {}

const Home : React.FC<HomeProps> = (
  props: HomeProps
) => {
  const defaultImage = 'https://via.placeholder.com/150/771796';
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4">
          Cats of the day
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {
          cats.data.children.map((child) => {
            const {
              title,
              author,
              score,
              thumbnail,
              link_flair_richtext
            } = child.data;
            return (
              <Grid key={title} item md={4}>
                <Box>
                  <img
                    width="250px"
                    src={thumbnail.match('http') ? thumbnail : defaultImage}
                  />
                </Box>
                <Box mt={2}>
                  <Typography variant="body1">Author: {author}</Typography>
                  <Typography variant="body1">Score: {score}</Typography>
                </Box>
              </Grid>
            );
          })
        }
      </Grid>
    </Container>
  );
}

export default Home;
