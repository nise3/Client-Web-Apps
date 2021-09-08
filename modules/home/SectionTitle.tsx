import React from 'react';
import {Box, Typography} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: '#682988',
      display: 'flex',
      alignItems: 'center',
    },
    vBar: {
      height: '40px',
      width: '5px',
      background: 'linear-gradient(45deg, #ec5c17,#5affab)',
      marginRight: '10px',
    },
  }),
);

type Props = {
  title: string;
  center?: boolean;
};

const SectionTitle = ({title, center}: Props) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant='h5'>
        <Box
          mb={5}
          className={classes.title}
          justifyContent={center ? 'center' : 'flex-start'}>
          <Box className={classes.vBar}></Box>
          <Box fontWeight='fontWeightBold'>{title}</Box>
        </Box>
      </Typography>
    </>
  );
};

export default SectionTitle;
