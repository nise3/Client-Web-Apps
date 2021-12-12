import React from 'react';
import {useRouter} from 'next/router';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {styled} from '@mui/material/styles';
import {Box, Button, Container, Grid, Tooltip} from '@mui/material';
import {Link} from '../../../@softbd/elements/common';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import {useIntl} from 'react-intl';
import {ArrowBack} from '@mui/icons-material';

const PREFIX = 'JobCircularDetails';

const classes = {
  date: `${PREFIX}-date`,
  icon: `${PREFIX}-icon`,
  container: `${PREFIX}-container`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.date}`]: {
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.icon}`]: {
    color: '#ffff',
    padding: '2px',
    borderRadius: '3px',
    '&:not(:last-child)': {marginRight: '10px'},
  },

  [`& .${classes.container}`]: {
    marginTop: '50px',
  },
}));

const JobCircularDetails = () => {
  const {messages} = useIntl();
  const authUser = useAuthUser<YouthAuthUser>();
  const router = useRouter();
  let {jobCircularId} = router.query;

  /*  const {data: jobCircularDetails} = useFetchCourseDetails(
    Number(jobCircularId),
  );*/

  const jobCircularDetails = {
    id: 5,
    company: 'Soft BD Ltd',
    logo: '/images/skill-matching-job-7.png',
    title: 'কম্পিউটার অপারেটর',
    experience: '২-৩ বছর অভিজ্ঞতা',
    location: 'মিরপুর',
    remuneration: '50000-60000',
    description:
      'this is the job description, this is the job description,' +
      ' this is the job description, ',
  };

  return (
    <StyledContainer maxWidth={'lg'}>
      <Grid container spacing={3}>
        <Grid item xs={12} mt={5}>
          <Grid container>
            <Grid item xs={5}>
              <Box className={classes.date}>
                <Link href={'/job-circular'}>
                  <Button
                    variant={'outlined'}
                    color={'primary'}
                    startIcon={<ArrowBack />}>
                    {messages['industry.job_circular']}
                  </Button>
                </Link>
              </Box>
            </Grid>

            <Grid item xs={7} textAlign={'right'}>
              <Tooltip title={messages['common.like']}>
                <ThumbUpAltIcon
                  className={classes.icon}
                  sx={{backgroundColor: '#008fff'}}
                />
              </Tooltip>
              <Tooltip title={messages['common.share_label']}>
                <ShareIcon
                  className={classes.icon}
                  sx={{backgroundColor: '#4E4E98'}}
                />
              </Tooltip>
              <Tooltip title={messages['common.print']}>
                <PrintOutlinedIcon
                  className={classes.icon}
                  sx={{backgroundColor: '#ffb700b8'}}
                />
              </Tooltip>
              <Tooltip title={messages['common.download_label']}>
                <SystemUpdateAltOutlinedIcon
                  className={classes.icon}
                  sx={{backgroundColor: '#2fc94d'}}
                />
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default JobCircularDetails;
