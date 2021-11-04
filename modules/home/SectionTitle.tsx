import React from 'react';
import {Box} from '@mui/material';
import {Theme} from '@mui/material/styles';

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {H3} from '../../@softbd/elements/common';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: '#682988',
      display: 'flex',
      alignItems: 'center',
    },
    vBar: {
      height: '33px',
      width: '2px',
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
      <H3 style={{fontSize: '33px', fontWeight: 'bold', marginBottom: '30px'}}>
        <Box
          className={classes.title}
          justifyContent={center ? 'center' : 'flex-start'}>
          <Box className={classes.vBar} />
          <Box fontWeight='fontWeightBold'>{title}</Box>
        </Box>
      </H3>
    </>
  );
};

export default SectionTitle;
