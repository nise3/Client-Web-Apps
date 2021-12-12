import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import {useIntl} from 'react-intl';
import {BusinessCenter, LocationOn, Share} from '@mui/icons-material';
import TagChip from '../../../../@softbd/elements/display/TagChip';

const PREFIX = 'JobCardComponent';

const classes = {
  titleStyle: `${PREFIX}-titleStyle`,
  skillsStyle: `${PREFIX}-skillsStyle`,
  share: `${PREFIX}-share`,
  shareTitle: `${PREFIX}-shareTitle`,
};

const StyledCard = styled(Card)(({theme}) => ({
  [`& .${classes.titleStyle}`]: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },

  [`& .${classes.skillsStyle}`]: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  [`& .${classes.share}`]: {
    backgroundColor: '#95979A !important',
    borderRadius: '4px 0px 0px 4px !important',
  },
  [`& .${classes.shareTitle}`]: {
    backgroundColor: '#C2C3C6 !important',
    borderRadius: '0px 4px 4px 0px !important',
    color: theme.palette.common.white,
    marginLeft: '-1.5rem !important',
  },
}));

interface JobCardComponentProps {
  job: any;
}

const JobCardComponent: FC<JobCardComponentProps> = ({job}) => {
  const {messages} = useIntl();

  return (
    <StyledCard>
      {job && (
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7} md={7}>
              <Box sx={{display: 'flex'}}>
                <Avatar src={job?.logo} sx={{width: '60px', height: '60px'}} />
                <Box sx={{marginLeft: 2}}>
                  <Typography className={classes.titleStyle}>
                    {job.title}
                  </Typography>
                  <Typography variant='caption'>{job.company}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={5} md={5} style={{textAlign: 'end'}}>
              <Button
                variant={'outlined'}
                color={'primary'}
                sx={{marginRight: '5px'}}>
                {messages['industry.details']}
              </Button>
              <Button variant={'contained'} color={'primary'}>
                {messages['industry.apply']}
              </Button>
            </Grid>
          </Grid>
          <Box sx={{margin: '15px 0px'}}>
            {job?.description || 'No description added'}
          </Box>
          <Box className={classes.skillsStyle}>
            <Box>
              <TagChip label={job.location} icon={<LocationOn />} />
              <TagChip label={job.experience} icon={<BusinessCenter />} />
              <TagChip
                label={`৳ ${job.remuneration} ${messages['common.taka']}`}
              />
            </Box>
            <Box display={'flex'}>
              <TagChip
                icon={<Share sx={{color: 'white !important'}} />}
                className={classes.share}
              />
              <TagChip
                label={messages['common.share']}
                className={classes.shareTitle}
              />
            </Box>
          </Box>
        </CardContent>
      )}
    </StyledCard>
  );
};

export default JobCardComponent;
