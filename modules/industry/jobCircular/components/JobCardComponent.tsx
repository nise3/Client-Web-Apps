import React, {FC, useCallback, useState} from 'react';
import {styled} from '@mui/material/styles';
import {useRouter} from 'next/router';
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
import {Link} from '../../../../@softbd/elements/common';
import {gotoLoginSignUpPage} from '../../../../@softbd/common/constants';
import {LINK_YOUTH_SIGNUP} from '../../../../@softbd/common/appLinks';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import JobApplyPopup from './JobApplyPopup';

const PREFIX = 'JobCardComponent';

const classes = {
  titleStyle: `${PREFIX}-titleStyle`,
  skillsStyle: `${PREFIX}-skillsStyle`,
  share: `${PREFIX}-share`,
  shareTitle: `${PREFIX}-shareTitle`,
};

const StyledCard = styled(Card)(({theme}) => ({
  [`& .${classes.titleStyle}`]: {
    fontWeight: 'bold',
  },

  [`& .${classes.skillsStyle}`]: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  [`& .${classes.share}`]: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.info.dark,
  },
}));

interface JobCardComponentProps {
  job: any;
}

const JobCardComponent: FC<JobCardComponentProps> = ({job}) => {
  const {messages} = useIntl();
  const [isOpenJobApplyModal, setIsOpenJobApplyModal] = useState(false);
  const authUser = useAuthUser<YouthAuthUser>();
  const router = useRouter();
  const closeJobApplyModal = useCallback(() => {
    setIsOpenJobApplyModal(false);
  }, []);

  const onJobApply = useCallback(() => {
    if (authUser) {
      setIsOpenJobApplyModal(true);
    } else {
      router.push(gotoLoginSignUpPage(LINK_YOUTH_SIGNUP));
    }
  }, []);
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
                    {job?.job_title}
                  </Typography>
                  <Typography variant='caption'>{job.company}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={5} md={5} style={{textAlign: 'end'}}>
              <Link passHref href={`/job-circular-details/${job.id}`}>
                <Button
                  variant={'outlined'}
                  color={'primary'}
                  sx={{marginRight: '5px'}}>
                  {messages['industry.details']}
                </Button>
              </Link>
              <Button
                variant={'contained'}
                color={'primary'}
                onClick={onJobApply}>
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
            <Box>
              <TagChip
                icon={<Share sx={{color: 'white !important'}} />}
                className={classes.share}
              />
            </Box>
          </Box>
        </CardContent>
      )}
      {isOpenJobApplyModal && (
        <JobApplyPopup job={job} onClose={closeJobApplyModal} />
      )}
    </StyledCard>
  );
};

export default JobCardComponent;
