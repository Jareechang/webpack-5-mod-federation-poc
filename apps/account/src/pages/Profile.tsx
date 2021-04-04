import * as React from 'react';
import {
  Button,
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
      width: '75px',
      height: '75px'
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
      <Avatar
        className={styles.Avatar}
        src="https://cdn2.thecatapi.com/images/8KNzClLX4.jpg"
        alt="Profile">
        Name
      </Avatar>

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
    </Container>
  )
}

export default ProfilePage;
