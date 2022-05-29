import React from 'react';
import {styled} from '@mui/material/styles';
import {Box, Container, Grid} from '@mui/material';
import TrainingLinkCard from './TrainingLinkCard';
import {useIntl} from 'react-intl';
import {H1} from '../../../@softbd/elements/common';

const PREFIX = 'TrainingLinks';

const classes = {
  noticeBoardText: `${PREFIX}-noticeBoardText`,
  paperSearch: `${PREFIX}-paperSearch`,
  noticeTopBox: `${PREFIX}-noticeTopBox`,
  paginationBox: `${PREFIX}-paginationBox`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  padding: 20,
  [`& .${classes.noticeBoardText}`]: {
    fontWeight: 'bold',
    fontSize: '1.421875rem',
    color: theme.palette.primary.main,
  },

  [`& .${classes.paperSearch}`]: {
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.noticeTopBox}`]: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },

  [`& .${classes.paginationBox}`]: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
}));

const TrainingLinks = () => {
  const {messages} = useIntl();

  const LINK_TRAINING_BMET = 'http://bmet.nise.gov.bd';
  const LINK_TRAINING_MUKTOPATH = 'http://bmet.muktopaath.gov.bd';
  const LINK_TRAINING_PRE_DEPARTURE =
    'http://muktopaath.gov.bd/course-details/206';

  return (
    <StyledContainer maxWidth={'lg'}>
      <Box className={classes.noticeTopBox}>
        <H1 className={classes.noticeBoardText}>
          {messages['migration_portal.training_links']}
        </H1>
      </Box>

      <Grid container spacing={3} style={{marginTop: 0}}>
        <Grid item xs={12} md={4}>
          <TrainingLinkCard
            redirectUrl={LINK_TRAINING_BMET}
            alt={messages['migration_portal.bmet_training'] as string}
            image={'/images/bmet-logo.png'}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TrainingLinkCard
            redirectUrl={LINK_TRAINING_MUKTOPATH}
            alt={messages['migration_portal.muktopaath_training'] as string}
            image={'/images/muktopath.png'}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TrainingLinkCard
            redirectUrl={LINK_TRAINING_PRE_DEPARTURE}
            alt={messages['migration_portal.pre_departure_training'] as string}
            image={'/images/muktopath.png'}
          />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default TrainingLinks;
