import * as React from 'react';
import {
  Grid,
  Button,
  Typography,
  TextField,
  Box,
  Avatar
} from '@material-ui/core';

import { css } from 'emotion';

import { Container } from 'app/SharedGlobals';

interface ProfilePageProps {}

const styles = {
  Avatar: css({
    '&&': {
      width: '125px',
      height: '125px'
    }
  }),
  Input: css({
    '&&': {
      paddingRight: '1em',
    },
    '&& .MuiInputBase-root': {
      borderRadius: 0
    }
  })
};

const ProfilePage : React.FC<ProfilePageProps> = (
  props: ProfilePageProps
) => {
  return (
    <Container>
      <Grid container>
        <Grid item md={4}>
          <Avatar
            className={styles.Avatar}
            src="https://cdn2.thecatapi.com/images/8KNzClLX4.jpg"
            alt="Profile">
            Name
          </Avatar>
          <Box py={2}>
            <Typography variant="body1">
              Professional napper
            </Typography>
          </Box>
        </Grid>
        <Grid item md={8}>
          <Typography variant="h6">
            Your Info
          </Typography>
          <Box mt={6}>
            <TextField
              className={styles.Input}
              id="standard-required"
              label="Name"
              defaultValue="T****S"
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              className={styles.Input}
              id="standard-required"
              label="Email"
              defaultValue="a***t@gmail.com"
            />
            <TextField
              className={styles.Input}
              id="standard-required"
              label="Phone"
              defaultValue="*****4833"
            />
          </Box>
          <Box mt={6}>
            <TextField
              className={styles.Input}
              id="standard-required"
              label="Address line 1"
              defaultValue="T****S"
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              className={styles.Input}
              id="standard-required"
              label="Address line 2"
              defaultValue="A****P"
              InputProps={{
                readOnly: true
              }}
            />
          </Box>

          <Box mt={6}>
            <Button
              variant="contained"
              color="primary"
              onClick={_ => console.log('updated!')}>
              Update
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProfilePage;
