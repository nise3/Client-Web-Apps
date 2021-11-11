import React from 'react';
import {styled} from '@mui/material/styles';
import {Box} from '@mui/material';
import {H3} from '../../@softbd/elements/common';

const PREFIX = 'SectionTitle';

const classes = {
  title: `${PREFIX}-title`,
  vBar: `${PREFIX}-vBar`,
};

const StyledH3 = styled(H3)(({theme}) => ({
  [`& .${classes.title}`]: {
    color: '#682988',
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.vBar}`]: {
    height: '33px',
    width: '2px',
    background: 'linear-gradient(45deg, #ec5c17,#5affab)',
    marginRight: '10px',
  },
}));

type Props = {
  title: string;
  center?: boolean;
};

const SectionTitle = ({title, center}: Props) => {
  return (
    <StyledH3
      style={{fontSize: '33px', fontWeight: 'bold', marginBottom: '30px'}}>
      <Box
        className={classes.title}
        justifyContent={center ? 'center' : 'flex-start'}>
        <Box className={classes.vBar} />
        <Box fontWeight='fontWeightBold'>{title}</Box>
      </Box>
    </StyledH3>
  );
};

export default SectionTitle;
