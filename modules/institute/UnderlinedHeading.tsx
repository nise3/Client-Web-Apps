import React, {ReactNode} from 'react';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Box, Typography} from '@mui/material';
// import {Fade} from 'react-awesome-reveal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      color: theme.palette.primary.main,
      textAlign: 'center',
      marginBottom: 20,
    },
    line: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 48,
    },
    lineOne: {
      background: '#33c2a7',
      width: 120,
      height: 3,
    },
    lineTwo: {
      background: '#f5a000',
      width: 100,
      height: 3,
    },
  }),
);

type Props = {
  children?: ReactNode;
};

const UnderlinedHeading = ({children}: Props) => {
  const classes = useStyles();
  return (
    <>
      <Typography
        variant='h3'
        gutterBottom={true}
        fontWeight='fontWeightBold'
        className={classes.heading}>
        {children}
      </Typography>
      <Box className={classes.line} mb={12}>
        <Box className={classes.lineOne} />
        <Box className={classes.lineTwo} />
      </Box>
    </>
  );
};

export default UnderlinedHeading;
