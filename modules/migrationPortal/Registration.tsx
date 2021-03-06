import React from 'react';
import {Container, Grid} from '@mui/material';
import Box from '@mui/material/Box';
import {useIntl} from 'react-intl';
import {H1} from '../../@softbd/elements/common';
import TrainingLinkCard from './trainingLinks/TrainingLinkCard';
import {styled} from '@mui/material/styles';

const PREFIX = 'Registration';

const classes = {
  noticeBoardText: `${PREFIX}-noticeBoardText`,
  noticeTopBox: `${PREFIX}-noticeTopBox`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  padding: 20,
  [`& .${classes.noticeBoardText}`]: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.421875rem',
    color: theme.palette.primary.main,
  },

  [`& .${classes.noticeTopBox}`]: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}));
const Registration = () => {
  const {messages} = useIntl();

  return (
    <StyledContainer maxWidth={'lg'}>
      <Box className={classes.noticeTopBox}>
        <H1 className={classes.noticeBoardText}>
          {messages['common.registration']}
        </H1>
      </Box>

      <Grid
        container
        spacing={3}
        style={{marginTop: 0}}
        justifyContent={'space-evenly'}>
        <Grid item xs={12} md={4}>
          <TrainingLinkCard
            redirectUrl={''}
            alt={messages['migration_portal.online_registration'] as string}
            image={'/images/online_reg.png'}
            pointerEvents={'none'}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TrainingLinkCard
            redirectUrl={''}
            alt={messages['migration_portal.offline_registration'] as string}
            image={'/images/Registration.png'}
            pointerEvents={'none'}
          />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Registration;
