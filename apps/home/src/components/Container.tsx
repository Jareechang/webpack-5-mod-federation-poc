import * as React from 'react';
import {
  Box,
} from '@material-ui/core';

interface ContainerProps {
  children: React.ReactNode;
}

const Container : React.FC<ContainerProps> = (
  props: ContainerProps
) => {
  return (
    <Box mx={18} my={4}>
      {props.children}
    </Box>
  );
}

export default Container;
