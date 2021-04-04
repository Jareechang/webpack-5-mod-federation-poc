import * as React from 'react';
import {
  Grid,
  Button,
  TextField,
  Box,
  Avatar
} from '@material-ui/core';

import {
  useHistory
} from 'react-router-dom';

import { css } from 'emotion';

import {
  AccountStore,
  emitter,
  Container
} from 'app/SharedGlobals';

import { useLoginStatus } from '../hooks';
import { LoginContext } from '../context';

interface LoginPageProps {}

const styles = {
  GridContainer: css({
    textAlign: 'center'
  }),
  Avatar: css({
    '&&': {
      margin: 'auto',
      width: '75px',
      height: '75px'
    }
  }),
  Input: css({
    '&&': {
      width: '250px',
    },
    '&& .MuiInputBase-root': {
      borderRadius: 0
    }
  }),
  Button: css({
    '&&': {
      width: '250px',
    },
  })
};

const LoginPage : React.FC<LoginPageProps> = (
  props: LoginPageProps
) => {
  const history = useHistory();

  const handleLogin = () => {
    AccountStore.setIsLoggedIn(true);
    history.push('/account/profile');
  }

  return (
    <Container>
      <Grid container className={styles.GridContainer}>
        <Grid item md={12}>
          <Avatar
            className={styles.Avatar}
            src="https://cdn2.thecatapi.com/images/8KNzClLX4.jpg"
            alt="Profile">
            Name
          </Avatar>
        </Grid>

        <Grid item md={12}>
          <Box mt={4}>
            <TextField
              className={styles.Input}
              id="standard-required"
              label="Username"
              defaultValue=""
            />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Box mt={4}>
            <TextField
              className={styles.Input}
              id="standard-required"
              label="Password"
              defaultValue=""
            />
          </Box>
        </Grid>
        <Grid item md={12}>
          <Box mt={6}>
            <Button
              className={styles.Button}
              variant="contained"
              color="primary"
              onClick={handleLogin}>
              Log in
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default LoginPage;
