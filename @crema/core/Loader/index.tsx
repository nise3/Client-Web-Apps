import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import NoSsr from '@mui/material/NoSsr';

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <NoSsr>
      <Box
        height='100%'
        display='flex'
        flex={1}
        alignItems='center'
        justifyContent='center'
        position='absolute'
        top={0}
        left={0}
        right={0}
        bottom={0}>
        <CircularProgress />
      </Box>
    </NoSsr>
  );
};

export default Loader;
