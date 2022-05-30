import React from 'react';
import {Container, Grid} from '@mui/material';
import Box from '@mui/material/Box';
//import {useIntl} from 'react-intl';
import {H1} from '../../@softbd/elements/common';
import TrainingLinkCard from './trainingLinks/TrainingLinkCard';
import {styled} from '@mui/material/styles';

const PREFIX = 'TrainingLinks';

const classes = {
  noticeBoardText: `${PREFIX}-noticeBoardText`,
  noticeTopBox: `${PREFIX}-noticeTopBox`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  padding: 20,
  [`& .${classes.noticeBoardText}`]: {
    fontWeight: 'bold',
    fontSize: '1.421875rem',
    color: theme.palette.primary.main,
  },

  [`& .${classes.noticeTopBox}`]: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
}));
const Registration = () => {
  //const {messages} = useIntl();

  const LINK_TRAINING_BMET = 'http://bmet.nise.gov.bd';
  const LINK_TRAINING_MUKTOPATH = 'http://bmet.muktopaath.gov.bd';

  return (
    <StyledContainer maxWidth={'lg'}>
      <Box className={classes.noticeTopBox}>
        <H1 className={classes.noticeBoardText}>{'Registration'}</H1>
      </Box>

      <Grid
        container
        spacing={3}
        style={{marginTop: 0}}
        justifyContent={'space-evenly'}>
        <Grid item xs={12} md={4}>
          <TrainingLinkCard
            redirectUrl={LINK_TRAINING_BMET}
            alt={'Online Registration'}
            image={'/images/placeholder.jpg'}
            pointerEvents={'none'}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TrainingLinkCard
            redirectUrl={LINK_TRAINING_MUKTOPATH}
            alt={'Offline Registration'}
            image={'/images/placeholder.jpg'}
            pointerEvents={'none'}
          />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Registration;
