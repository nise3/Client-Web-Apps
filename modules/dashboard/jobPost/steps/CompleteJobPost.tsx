import React from 'react';
import {Box, Button, CardMedia, Chip, Grid, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import {H6} from '../../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import CallIcon from '@mui/icons-material/Call';
interface Props {
  onBack: () => void;
  onContinue: () => void;
}
const PREFIX = 'CompleteJob';

const classes = {
  image: `${PREFIX}-image`,
};
const StyledBox = styled(Box)(() => {
  return {
    [`& .${classes.image}`]: {
      borderRadius: '100px',
    },
  };
});

const CompleteJobPost = ({onBack, onContinue}: Props) => {
  const {messages} = useIntl();
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} mt={2} display={'flex'} justifyContent={'center'}>
        <StyledBox>
          <CardMedia
            component='img'
            width={'160'}
            height='154'
            className={classes.image}
            image={'/images/done.jpeg'}
            alt={'Completed'}
          />
        </StyledBox>
      </Grid>
      <Grid item xs={12} display={'flex'} justifyContent={'center'}>
        <H6>{messages['common.job_posting_successful']}</H6>
      </Grid>
      <Grid item xs={12} display={'flex'} justifyContent={'center'}>
        <Typography align={'center'}>
          {messages['common.job_posting_test']}
        </Typography>
      </Grid>
      <Grid item xs={12} display={'flex'} justifyContent={'center'}>
        <H6 sx={{marginRight: '10px'}}>{messages['common.job_status']}:</H6>
        <Chip
          icon={<ReportProblemIcon />}
          label={messages['common.pending']}
          color={'warning'}
          size={'medium'}
        />
      </Grid>
      <Grid item xs={12} display={'flex'} justifyContent={'center'}>
        <Box>
          <Button
            startIcon={'৳'}
            variant={'contained'}
            sx={{marginRight: '5px'}}>
            Pay Now
          </Button>
          <Button startIcon={<FindInPageIcon />} variant={'outlined'}>
            View job
          </Button>
        </Box>
      </Grid>
      <Grid item xs={12} display={'flex'} justifyContent={'center'}>
        <Box
          sx={{backgroundColor: '#d9edf7', width: '75%', height: '35px'}}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}>
          <Typography align={'center'}>Customer Support:</Typography>
          <CallIcon />
          <Typography>0961283833</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CompleteJobPost;
